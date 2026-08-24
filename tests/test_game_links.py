from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

IGO_APP = "https://isicalcexp-bqjsukv3.manus.space/"
QUEST_APP = "https://realityeng-epdhlkrn.manus.space/"
QUEST_ENTRY = "https://realityeng-epdhlkrn.manus.space/explore"
QUEST_LEADERBOARD = "https://realityeng-epdhlkrn.manus.space/leaderboard"
DAVID_OBSERVATORY = "https://cse-reality-nuohpkmp.manus.space/"
STALE_KMP = "https://kmp.manus.space"


class GameLinkRegressionTests(unittest.TestCase):
    def read(self, relative_path: str) -> str:
        return (DOCS / relative_path).read_text(encoding="utf-8")

    def test_homepage_mirrors_use_live_game_destinations(self) -> None:
        for relative_path in ("index.html", "site.html"):
            with self.subTest(relative_path=relative_path):
                content = self.read(relative_path)
                self.assertIn(IGO_APP, content)
                self.assertIn(QUEST_APP, content)
                self.assertIn(QUEST_ENTRY, content)
                self.assertIn(QUEST_LEADERBOARD, content)
                self.assertIn(DAVID_OBSERVATORY, content)
                self.assertNotIn(STALE_KMP, content)

    def test_play_hub_routes_to_both_live_applications(self) -> None:
        content = self.read("play/index.html")
        self.assertIn(IGO_APP.rstrip("/"), content)
        self.assertIn(DAVID_OBSERVATORY, content)
        self.assertNotIn(STALE_KMP, content)

    def test_legacy_founders_route_has_a_local_redirect(self) -> None:
        content = self.read("play/founders/index.html")
        self.assertIn("/pioneers.html#active-pioneers", content)

    def test_legacy_leaderboard_route_has_a_quest_redirect(self) -> None:
        content = self.read("play/leaderboard/index.html")
        self.assertIn(QUEST_LEADERBOARD, content)


if __name__ == "__main__":
    unittest.main()
