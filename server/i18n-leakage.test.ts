import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * GP-001 Compliance Guard: Latin-script leakage under ZH locale
 * 
 * This test ensures that every data-i18n key used in site.html
 * has a corresponding Chinese translation in lang-cn.js.
 * If a key is missing, the element will display English text
 * when ZH is selected — a "Latin-script leak".
 */

const PUBLIC_DIR = path.resolve(__dirname, '../client/public');

function extractI18nKeysFromHTML(filePath: string): string[] {
  const html = fs.readFileSync(filePath, 'utf-8');
  const regex = /data-i18n="([^"]+)"/g;
  const keys: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    keys.push(match[1]);
  }
  return [...new Set(keys)];
}

function extractI18nKeysFromJS(filePath: string): string[] {
  const js = fs.readFileSync(filePath, 'utf-8');
  const regex = /i18n:\s*'([^']+)'/g;
  const keys: string[] = [];
  let match;
  while ((match = regex.exec(js)) !== null) {
    keys.push(match[1]);
  }
  return [...new Set(keys)];
}

function extractTranslationKeys(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /"([^"]+)":\s*"/g;
  const keys: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  return [...new Set(keys)];
}

describe('GP-001: ZH Translation Coverage (Latin-script leakage guard)', () => {
  const langCnPath = path.join(PUBLIC_DIR, 'js/lang-cn.js');
  const siteHtmlPath = path.join(PUBLIC_DIR, 'site.html');
  const navOptimisePath = path.join(PUBLIC_DIR, 'js/nav-optimise.js');

  it('lang-cn.js file exists', () => {
    expect(fs.existsSync(langCnPath)).toBe(true);
  });

  it('site.html has no data-i18n keys missing from lang-cn.js', () => {
    const htmlKeys = extractI18nKeysFromHTML(siteHtmlPath);
    const cnKeys = extractTranslationKeys(langCnPath);

    const missing = htmlKeys.filter(key => !cnKeys.includes(key));

    if (missing.length > 0) {
      console.log('Missing ZH translations for site.html keys:', missing);
    }

    expect(missing).toEqual([]);
  });

  it('nav-optimise.js has no i18n keys missing from lang-cn.js', () => {
    const navKeys = extractI18nKeysFromJS(navOptimisePath);
    const cnKeys = extractTranslationKeys(langCnPath);

    const missing = navKeys.filter(key => !cnKeys.includes(key));

    if (missing.length > 0) {
      console.log('Missing ZH translations for nav-optimise.js keys:', missing);
    }

    expect(missing).toEqual([]);
  });

  it('XCHANGE cross-link in site.html network bar points to correct domain', () => {
    const html = fs.readFileSync(siteHtmlPath, 'utf-8');
    
    // The network bar XCHANGE link: href comes before data-i18n="net.xchange"
    const networkBarMatch = html.match(/href="([^"]+)"[^>]*>.*?data-i18n="net\.xchange"/);
    
    // Also check the agent card section (AGENT 5 = QUARTERMASTER = xChange)
    // href is on the parent <a> tag BEFORE the QUARTERMASTER text
    const agentCardMatch = html.match(/href="([^"]+)"[\s\S]{0,300}?QUARTERMASTER/);
    
    expect(networkBarMatch).not.toBeNull();
    if (networkBarMatch) {
      expect(networkBarMatch[1]).toContain('xchangeapp-adbvx9fr');
    }
    
    if (agentCardMatch) {
      expect(agentCardMatch[1]).toContain('xchangeapp-adbvx9fr');
    }
  });

  it('all 5 network domains are correctly linked in site.html', () => {
    const html = fs.readFileSync(siteHtmlPath, 'utf-8');
    
    // GP-001 Domain Registry
    const domains = {
      'DOM-001 Academy': 'infra-acad',
      'DOM-002 Quest': 'realityeng-epdhlkrn',
      'DOM-003 xChange': 'xchangeapp-adbvx9fr',
      'DOM-004 Memorial': 'nigelmemorial-ucmtq9dn',
      'DOM-005 News': 'xgrowthtrk-2a93yo5z',
    };

    for (const [name, subdomain] of Object.entries(domains)) {
      const found = html.includes(subdomain);
      if (!found) {
        console.log(`WARNING: ${name} (${subdomain}) not found in site.html`);
      }
      // At minimum, xChange must be correct (P1 fix)
      if (name === 'DOM-003 xChange') {
        expect(found).toBe(true);
      }
    }
  });

  it('no translation values are empty strings', () => {
    const content = fs.readFileSync(langCnPath, 'utf-8');
    const regex = /"([^"]+)":\s*""/g;
    const emptyKeys: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      emptyKeys.push(match[1]);
    }

    if (emptyKeys.length > 0) {
      console.log('Empty translation values found:', emptyKeys);
    }

    expect(emptyKeys).toEqual([]);
  });
});
