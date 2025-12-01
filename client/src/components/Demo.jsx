import { useState, } from 'react';
import './Leaderboard.css';
import './Awards.css';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid2 as Grid, LinearProgress, ToggleButtonGroup, ToggleButton, Select, MenuItem } from '@mui/material';
import LeagueCumulativeChart from './LeagueCumulativeChart';
import PlayerStatsChart from './PlayerStatsChart';

const demoV2 = {
    "awards": [
        {
            "entity_type": "award",
            "award_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 80
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 81
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 101
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 81
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 83
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 96
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 75
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 75
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 74
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 73
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 80
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 85
                }
            },
            "created_at": "2025-11-30T19:31:32.010Z",
            "display_order": 0,
            "description": "Awarded to the manager who scored the most TDs during the season (includes DEF TDs).",
            "PK": "LEAGUE#yahoo#ID#449.l.607868",
            "name": "Most TDs Scored",
            "award_data_weekly": {
                "1": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 1
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 3
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 9
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 3
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 6
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 4
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 8
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 4
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 3
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 2
                    }
                },
                "2": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 8
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 4
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 2
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 3
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 6
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 9
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 5
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 2
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 4
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 2
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 2
                    }
                },
                "3": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 6
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 5
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 7
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 3
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 5
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 2
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 3
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 6
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 7
                    }
                },
                "4": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 3
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 7
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 5
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 5
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 2
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 5
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 6
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 3
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 4
                    }
                },
                "5": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 6
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 3
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 4
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 6
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 2
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 4
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 8
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 9
                    }
                },
                "6": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 4
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 10
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 5
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 7
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 8
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 5
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 5
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 8
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 7
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 3
                    }
                },
                "7": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 3
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 4
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 8
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 5
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 6
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 4
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 5
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 4
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 5
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 8
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 4
                    }
                },
                "8": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 5
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 5
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 4
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 6
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 6
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 6
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 6
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 8
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 5
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 6
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 6
                    }
                },
                "9": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 3
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 4
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 8
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 3
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 7
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 7
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 1
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 7
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 9
                    }
                },
                "10": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 5
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 5
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 7
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 2
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 3
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 7
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 3
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 5
                    }
                },
                "11": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 7
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 5
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 5
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 5
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 7
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 2
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 3
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 1
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 6
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 6
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 6
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 3
                    }
                },
                "12": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 3
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 4
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 5
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 3
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 6
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 3
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 3
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 7
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 2
                    }
                },
                "13": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 6
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 6
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 4
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 6
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 3
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 6
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 3
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 6
                    }
                },
                "14": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 8
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 3
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 4
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 7
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 7
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 9
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 7
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 5
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 4
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 7
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 5
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 3
                    }
                },
                "15": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 5
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 6
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 7
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 7
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 8
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 6
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 4
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 6
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 6
                    }
                },
                "16": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 6
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 5
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 5
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 7
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 4
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 3
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 6
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 6
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 5
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 9
                    }
                },
                "17": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 1
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 2
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 9
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 7
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 5
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 5
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 6
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 5
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 6
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 5
                    }
                }
            },
            "variants": [
                {
                    "winners_weekly": {
                        "1": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 9,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "2": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 9,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "3": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 7,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "4": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 7,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "5": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 9,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "6": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 10,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "7": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 8,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "8": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 8,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "9": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 9,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "10": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 7,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "11": [
                            {
                                "teamName": "Big Chunk",
                                "total": 7,
                                "id": "449.l.607868.t.3"
                            }
                        ],
                        "12": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 7,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "13": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 6,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "14": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 9,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "15": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 8,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "16": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 9,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "17": [
                            {
                                "teamName": "Mel🥇",
                                "total": 9,
                                "id": "449.l.607868.t.7"
                            }
                        ]
                    },
                    "winners_season": [
                        {
                            "teamName": "The Dicktator 🥇🥉🚽",
                            "total": 101,
                            "id": "449.l.607868.t.1"
                        }
                    ],
                    "copy": {
                        "icon": "👑",
                        "season": "The team that racked up the most touchdown points all season.",
                        "weekly": "{team_name} found the end zone more than anyone this week."
                    },
                    "title": "Touchdown King",
                    "key": "most_tds_top",
                    "award_id": "most-td-award",
                    "direction": "top"
                }
            ],
            "player_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 80,
                    "players": {
                        "449.p.33998": {
                            "name": "Wan'Dale Robinson (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.40900": {
                            "name": "Caleb Williams (QB)",
                            "total": 12,
                            "position": "QB",
                            "weekly": {
                                "6": 4,
                                "12": 2,
                                "13": 3,
                                "14": 2,
                                "15": 1
                            }
                        },
                        "449.p.34008": {
                            "name": "Alec Pierce (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "2": 1
                            }
                        },
                        "449.p.34019": {
                            "name": "James Cook III (RB)",
                            "total": 17,
                            "position": "RB",
                            "weekly": {
                                "2": 3,
                                "3": 1,
                                "5": 1,
                                "7": 1,
                                "8": 2,
                                "10": 1,
                                "11": 2,
                                "13": 1,
                                "15": 2,
                                "16": 2,
                                "17": 1
                            }
                        },
                        "449.p.100033": {
                            "name": "Baltimore (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "16": 1
                            }
                        },
                        "449.p.30218": {
                            "name": "James Conner (RB)",
                            "total": 9,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "4": 1,
                                "8": 1,
                                "10": 1,
                                "14": 1,
                                "15": 2,
                                "16": 1
                            }
                        },
                        "449.p.40168": {
                            "name": "Puka Nacua (WR)",
                            "total": 4,
                            "position": "WR",
                            "weekly": {
                                "11": 1,
                                "13": 1,
                                "14": 2
                            }
                        },
                        "449.p.33393": {
                            "name": "Ja'Marr Chase (WR)",
                            "total": 16,
                            "position": "WR",
                            "weekly": {
                                "3": 2,
                                "4": 1,
                                "5": 2,
                                "7": 1,
                                "8": 1,
                                "10": 3,
                                "11": 2,
                                "13": 1,
                                "14": 2,
                                "16": 1
                            }
                        },
                        "449.p.40048": {
                            "name": "Dalton Kincaid (TE)",
                            "total": 2,
                            "position": "TE",
                            "weekly": {
                                "3": 1,
                                "8": 1
                            }
                        },
                        "449.p.7200": {
                            "name": "Aaron Rodgers (QB)",
                            "total": 13,
                            "position": "QB",
                            "weekly": {
                                "2": 2,
                                "3": 2,
                                "5": 2,
                                "7": 1,
                                "9": 3,
                                "11": 2,
                                "16": 1
                            }
                        },
                        "449.p.26650": {
                            "name": "DeAndre Hopkins (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "12": 1,
                                "14": 1
                            }
                        },
                        "449.p.34320": {
                            "name": "Jordan Mason (RB)",
                            "total": 2,
                            "position": "W/R/T",
                            "weekly": {
                                "2": 1,
                                "4": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 81,
                    "players": {
                        "449.p.40030": {
                            "name": "C.J. Stroud (QB)",
                            "total": 19,
                            "position": "QB",
                            "weekly": {
                                "1": 2,
                                "2": 1,
                                "3": 1,
                                "4": 2,
                                "5": 1,
                                "6": 3,
                                "8": 1,
                                "10": 1,
                                "12": 2,
                                "13": 1,
                                "15": 2,
                                "16": 2
                            }
                        },
                        "449.p.33477": {
                            "name": "Nico Collins (WR)",
                            "total": 6,
                            "position": "WR",
                            "weekly": {
                                "2": 1,
                                "4": 1,
                                "5": 1,
                                "12": 1,
                                "15": 2
                            }
                        },
                        "449.p.31908": {
                            "name": "Terry McLaurin (WR)",
                            "total": 12,
                            "position": "W/R/T",
                            "weekly": {
                                "3": 1,
                                "4": 1,
                                "6": 2,
                                "9": 2,
                                "12": 1,
                                "13": 2,
                                "15": 2,
                                "16": 1
                            }
                        },
                        "449.p.40878": {
                            "name": "Brock Bowers (TE)",
                            "total": 4,
                            "position": "TE",
                            "weekly": {
                                "5": 1,
                                "9": 1,
                                "11": 1,
                                "13": 1
                            }
                        },
                        "449.p.32887": {
                            "name": "Jauan Jennings (WR)",
                            "total": 3,
                            "position": "W/R/T",
                            "weekly": {
                                "11": 1,
                                "14": 2
                            }
                        },
                        "449.p.32756": {
                            "name": "Zack Moss (RB)",
                            "total": 2,
                            "position": "RB",
                            "weekly": {
                                "3": 1,
                                "4": 1
                            }
                        },
                        "449.p.40102": {
                            "name": "Tucker Kraft (TE)",
                            "total": 2,
                            "position": "W/R/T",
                            "weekly": {
                                "7": 1,
                                "8": 1
                            }
                        },
                        "449.p.30161": {
                            "name": "Joe Mixon (RB)",
                            "total": 12,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "6": 2,
                                "7": 2,
                                "8": 1,
                                "9": 1,
                                "10": 1,
                                "11": 3,
                                "13": 1
                            }
                        },
                        "449.p.40893": {
                            "name": "Marvin Harrison Jr. (WR)",
                            "total": 6,
                            "position": "WR",
                            "weekly": {
                                "2": 2,
                                "3": 1,
                                "4": 1,
                                "8": 1,
                                "10": 1
                            }
                        },
                        "449.p.100005": {
                            "name": "Cleveland (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "4": 1,
                                "6": 1
                            }
                        },
                        "449.p.40055": {
                            "name": "Bijan Robinson (RB)",
                            "total": 13,
                            "position": "RB",
                            "weekly": {
                                "3": 1,
                                "6": 2,
                                "7": 1,
                                "8": 1,
                                "10": 2,
                                "13": 1,
                                "14": 1,
                                "16": 2,
                                "17": 2
                            }
                        }
                    }
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 101,
                    "players": {
                        "449.p.40063": {
                            "name": "Jayden Reed (WR)",
                            "total": 4,
                            "position": "W/R/T",
                            "weekly": {
                                "6": 1,
                                "11": 1,
                                "13": 2
                            }
                        },
                        "449.p.40196": {
                            "name": "Chase Brown (RB)",
                            "total": 6,
                            "position": "W/R/T",
                            "weekly": {
                                "9": 1,
                                "10": 1,
                                "13": 1,
                                "14": 1,
                                "15": 2
                            }
                        },
                        "449.p.40051": {
                            "name": "Quentin Johnston (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "10": 1
                            }
                        },
                        "449.p.31002": {
                            "name": "Lamar Jackson (QB)",
                            "total": 43,
                            "position": "QB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 2,
                                "4": 3,
                                "5": 4,
                                "6": 1,
                                "7": 5,
                                "8": 2,
                                "9": 3,
                                "10": 4,
                                "11": 1,
                                "12": 3,
                                "13": 2,
                                "15": 5,
                                "16": 3,
                                "17": 3
                            }
                        },
                        "449.p.33412": {
                            "name": "Najee Harris (RB)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "14": 1
                            }
                        },
                        "449.p.30972": {
                            "name": "Saquon Barkley (RB)",
                            "total": 15,
                            "position": "RB",
                            "weekly": {
                                "1": 3,
                                "3": 2,
                                "7": 1,
                                "9": 2,
                                "11": 2,
                                "12": 2,
                                "13": 1,
                                "16": 2
                            }
                        },
                        "449.p.31896": {
                            "name": "DK Metcalf (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "3": 1,
                                "7": 1
                            }
                        },
                        "449.p.30136": {
                            "name": "Evan Engram (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "8": 1
                            }
                        },
                        "449.p.28534": {
                            "name": "Stefon Diggs (WR)",
                            "total": 4,
                            "position": "WR",
                            "weekly": {
                                "1": 2,
                                "4": 1,
                                "6": 1
                            }
                        },
                        "449.p.25785": {
                            "name": "Russell Wilson (QB)",
                            "total": 2,
                            "position": "QB",
                            "weekly": {
                                "14": 2
                            }
                        },
                        "449.p.29279": {
                            "name": "Derrick Henry (RB)",
                            "total": 16,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 2,
                                "4": 2,
                                "5": 1,
                                "6": 2,
                                "7": 1,
                                "8": 1,
                                "9": 2,
                                "10": 1,
                                "11": 1,
                                "17": 1
                            }
                        },
                        "449.p.100016": {
                            "name": "Minnesota (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.100003": {
                            "name": "Chicago (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "1": 2
                            }
                        },
                        "449.p.27277": {
                            "name": "Adam Thielen (WR)",
                            "total": 3,
                            "position": "WR",
                            "weekly": {
                                "16": 1,
                                "17": 2
                            }
                        }
                    }
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 81,
                    "players": {
                        "449.p.32696": {
                            "name": "Jordan Love (QB)",
                            "total": 9,
                            "position": "QB",
                            "weekly": {
                                "1": 2,
                                "6": 4,
                                "7": 3
                            }
                        },
                        "449.p.40097": {
                            "name": "Tank Dell (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "6": 1,
                                "8": 1
                            }
                        },
                        "449.p.30971": {
                            "name": "Baker Mayfield (QB)",
                            "total": 26,
                            "position": "QB",
                            "weekly": {
                                "2": 2,
                                "3": 1,
                                "4": 3,
                                "5": 3,
                                "10": 1,
                                "12": 1,
                                "13": 1,
                                "14": 3,
                                "15": 4,
                                "16": 2,
                                "17": 5
                            }
                        },
                        "449.p.33500": {
                            "name": "Amon-Ra St. Brown (WR)",
                            "total": 13,
                            "position": "WR",
                            "weekly": {
                                "3": 1,
                                "4": 2,
                                "6": 1,
                                "7": 1,
                                "8": 1,
                                "9": 1,
                                "10": 1,
                                "11": 2,
                                "15": 1,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.26658": {
                            "name": "Zach Ertz (TE)",
                            "total": 2,
                            "position": "TE",
                            "weekly": {
                                "12": 1,
                                "13": 1
                            }
                        },
                        "449.p.30996": {
                            "name": "Calvin Ridley (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "16": 1
                            }
                        },
                        "449.p.31856": {
                            "name": "Josh Jacobs (RB)",
                            "total": 11,
                            "position": "W/R/T",
                            "weekly": {
                                "5": 1,
                                "7": 1,
                                "8": 2,
                                "13": 1,
                                "14": 3,
                                "15": 1,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.40126": {
                            "name": "Josh Downs (WR)",
                            "total": 2,
                            "position": "W/R/T",
                            "weekly": {
                                "8": 1,
                                "11": 1
                            }
                        },
                        "449.p.32725": {
                            "name": "J.K. Dobbins (RB)",
                            "total": 8,
                            "position": "W/R/T",
                            "weekly": {
                                "2": 1,
                                "6": 1,
                                "8": 1,
                                "9": 2,
                                "11": 2,
                                "17": 1
                            }
                        },
                        "449.p.30295": {
                            "name": "Aaron Jones Sr. (RB)",
                            "total": 6,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "3": 1,
                                "12": 1,
                                "13": 1,
                                "14": 1,
                                "15": 1
                            }
                        },
                        "449.p.32231": {
                            "name": "Jakobi Meyers (WR)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "17": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 83,
                    "players": {
                        "449.p.40084": {
                            "name": "Rashee Rice (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "2": 1,
                                "3": 1
                            }
                        },
                        "449.p.30182": {
                            "name": "Cooper Kupp (WR)",
                            "total": 5,
                            "position": "WR",
                            "weekly": {
                                "8": 1,
                                "11": 2,
                                "12": 1,
                                "14": 1
                            }
                        },
                        "449.p.40908": {
                            "name": "Ladd McConkey (WR)",
                            "total": 3,
                            "position": "WR",
                            "weekly": {
                                "15": 1,
                                "17": 2
                            }
                        },
                        "449.p.33100": {
                            "name": "Rico Dowdle (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.30142": {
                            "name": "David Njoku (TE)",
                            "total": 5,
                            "position": "TE",
                            "weekly": {
                                "7": 1,
                                "8": 1,
                                "13": 2,
                                "14": 1
                            }
                        },
                        "449.p.32685": {
                            "name": "Jerry Jeudy (WR)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "14": 1
                            }
                        },
                        "449.p.31833": {
                            "name": "Kyler Murray (QB)",
                            "total": 22,
                            "position": "QB",
                            "weekly": {
                                "1": 1,
                                "2": 3,
                                "3": 1,
                                "4": 1,
                                "5": 2,
                                "6": 1,
                                "7": 2,
                                "8": 2,
                                "10": 3,
                                "13": 1,
                                "14": 2,
                                "16": 2,
                                "17": 1
                            }
                        },
                        "449.p.40118": {
                            "name": "De'Von Achane (RB)",
                            "total": 11,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "8": 1,
                                "9": 2,
                                "11": 1,
                                "12": 2,
                                "13": 1,
                                "14": 1,
                                "16": 1
                            }
                        },
                        "449.p.40899": {
                            "name": "Malik Nabers (WR)",
                            "total": 3,
                            "position": "W/R/T",
                            "weekly": {
                                "2": 1,
                                "3": 2
                            }
                        },
                        "449.p.32703": {
                            "name": "Tee Higgins (WR)",
                            "total": 9,
                            "position": "WR",
                            "weekly": {
                                "5": 2,
                                "7": 1,
                                "11": 1,
                                "13": 1,
                                "16": 1,
                                "17": 3
                            }
                        },
                        "449.p.100034": {
                            "name": "Houston (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "11": 1,
                                "12": 1
                            }
                        },
                        "449.p.100001": {
                            "name": "Atlanta (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "16": 2
                            }
                        },
                        "449.p.40059": {
                            "name": "Jahmyr Gibbs (RB)",
                            "total": 16,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "3": 1,
                                "4": 2,
                                "7": 2,
                                "8": 1,
                                "9": 1,
                                "11": 1,
                                "12": 2,
                                "14": 1,
                                "15": 2,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.26662": {
                            "name": "Geno Smith (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "11": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 96,
                    "players": {
                        "449.p.30180": {
                            "name": "Alvin Kamara (RB)",
                            "total": 8,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 4,
                                "4": 1,
                                "6": 1,
                                "15": 1
                            }
                        },
                        "449.p.30197": {
                            "name": "Chris Godwin Jr. (WR)",
                            "total": 5,
                            "position": "W/R/T",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 1,
                                "6": 2
                            }
                        },
                        "449.p.32687": {
                            "name": "CeeDee Lamb (WR)",
                            "total": 6,
                            "position": "WR",
                            "weekly": {
                                "2": 1,
                                "4": 1,
                                "8": 2,
                                "14": 1,
                                "15": 1
                            }
                        },
                        "449.p.100006": {
                            "name": "Dallas (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "13": 1
                            }
                        },
                        "449.p.27581": {
                            "name": "Davante Adams (WR)",
                            "total": 7,
                            "position": "WR",
                            "weekly": {
                                "2": 1,
                                "9": 1,
                                "13": 1,
                                "14": 1,
                                "15": 2,
                                "16": 1
                            }
                        },
                        "449.p.33514": {
                            "name": "Chuba Hubbard (RB)",
                            "total": 10,
                            "position": "RB",
                            "weekly": {
                                "4": 1,
                                "5": 1,
                                "7": 1,
                                "9": 2,
                                "10": 1,
                                "12": 1,
                                "14": 1,
                                "16": 2
                            }
                        },
                        "449.p.32843": {
                            "name": "Darnell Mooney (WR)",
                            "total": 4,
                            "position": "W/R/T",
                            "weekly": {
                                "5": 2,
                                "8": 1,
                                "9": 1
                            }
                        },
                        "449.p.30259": {
                            "name": "George Kittle (TE)",
                            "total": 8,
                            "position": "TE",
                            "weekly": {
                                "2": 1,
                                "4": 1,
                                "5": 1,
                                "6": 2,
                                "8": 1,
                                "10": 1,
                                "12": 1
                            }
                        },
                        "449.p.40954": {
                            "name": "Jalen McMillan (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "17": 2
                            }
                        },
                        "449.p.30977": {
                            "name": "Josh Allen (QB)",
                            "total": 41,
                            "position": "QB",
                            "weekly": {
                                "1": 4,
                                "2": 1,
                                "3": 4,
                                "5": 1,
                                "6": 3,
                                "7": 2,
                                "8": 2,
                                "9": 3,
                                "10": 1,
                                "11": 2,
                                "13": 4,
                                "14": 6,
                                "15": 4,
                                "16": 1,
                                "17": 3
                            }
                        },
                        "449.p.100026": {
                            "name": "Seattle (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.100004": {
                            "name": "Cincinnati (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "7": 1
                            }
                        },
                        "449.p.100025": {
                            "name": "San Francisco (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "4": 1
                            }
                        },
                        "449.p.26662": {
                            "name": "Geno Smith (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "12": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 75,
                    "players": {
                        "449.p.40041": {
                            "name": "Jaxon Smith-Njigba (WR)",
                            "total": 6,
                            "position": "WR",
                            "weekly": {
                                "5": 1,
                                "9": 2,
                                "12": 1,
                                "14": 1,
                                "16": 1
                            }
                        },
                        "449.p.40162": {
                            "name": "Roschon Johnson (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "12": 1
                            }
                        },
                        "449.p.40075": {
                            "name": "Zach Charbonnet (RB)",
                            "total": 2,
                            "position": "RB",
                            "weekly": {
                                "14": 2
                            }
                        },
                        "449.p.34062": {
                            "name": "Cade Otton (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "9": 1
                            }
                        },
                        "449.p.33398": {
                            "name": "DeVonta Smith (WR)",
                            "total": 8,
                            "position": "WR",
                            "weekly": {
                                "2": 1,
                                "6": 1,
                                "8": 1,
                                "9": 1,
                                "14": 1,
                                "15": 1,
                                "17": 2
                            }
                        },
                        "449.p.33991": {
                            "name": "Breece Hall (RB)",
                            "total": 7,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 1,
                                "7": 1,
                                "11": 2,
                                "15": 1
                            }
                        },
                        "449.p.33413": {
                            "name": "Travis Etienne Jr. (RB)",
                            "total": 2,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1
                            }
                        },
                        "449.p.34007": {
                            "name": "George Pickens (WR)",
                            "total": 3,
                            "position": "W/R/T",
                            "weekly": {
                                "7": 1,
                                "10": 1,
                                "13": 1
                            }
                        },
                        "449.p.30973": {
                            "name": "Sam Darnold (QB)",
                            "total": 3,
                            "position": "QB",
                            "weekly": {
                                "17": 3
                            }
                        },
                        "449.p.32713": {
                            "name": "Cole Kmet (TE)",
                            "total": 3,
                            "position": "TE",
                            "weekly": {
                                "3": 1,
                                "6": 2
                            }
                        },
                        "449.p.32723": {
                            "name": "Jalen Hurts (QB)",
                            "total": 32,
                            "position": "QB",
                            "weekly": {
                                "1": 2,
                                "2": 2,
                                "4": 2,
                                "6": 2,
                                "7": 3,
                                "8": 4,
                                "9": 3,
                                "10": 4,
                                "11": 1,
                                "12": 1,
                                "13": 2,
                                "14": 3,
                                "15": 3
                            }
                        },
                        "449.p.32704": {
                            "name": "Michael Pittman Jr. (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.100023": {
                            "name": "Pittsburgh (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "8": 1
                            }
                        },
                        "449.p.26699": {
                            "name": "Keenan Allen (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "15": 1,
                                "16": 1
                            }
                        },
                        "449.p.40892": {
                            "name": "Ricky Pearsall (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "10": 1
                            }
                        },
                        "449.p.100002": {
                            "name": "Buffalo (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "10": 1,
                                "16": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 75,
                    "players": {
                        "449.p.40040": {
                            "name": "Anthony Richardson Sr. (QB)",
                            "total": 4,
                            "position": "QB",
                            "weekly": {
                                "1": 3,
                                "2": 1
                            }
                        },
                        "449.p.33392": {
                            "name": "Kyle Pitts Sr. (TE)",
                            "total": 3,
                            "position": "TE",
                            "weekly": {
                                "1": 1,
                                "8": 2
                            }
                        },
                        "449.p.34120": {
                            "name": "Kyren Williams (RB)",
                            "total": 16,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 3,
                                "4": 1,
                                "5": 1,
                                "7": 2,
                                "8": 1,
                                "12": 1,
                                "13": 1,
                                "14": 2,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.30182": {
                            "name": "Cooper Kupp (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "1": 1
                            }
                        },
                        "449.p.31883": {
                            "name": "A.J. Brown (WR)",
                            "total": 7,
                            "position": "WR",
                            "weekly": {
                                "1": 1,
                                "6": 1,
                                "7": 1,
                                "12": 1,
                                "15": 1,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.100006": {
                            "name": "Dallas (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "1": 1
                            }
                        },
                        "449.p.100018": {
                            "name": "New Orleans (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.32722": {
                            "name": "Cam Akers (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.40119": {
                            "name": "Tyjae Spears (RB)",
                            "total": 2,
                            "position": "RB",
                            "weekly": {
                                "16": 2
                            }
                        },
                        "449.p.31017": {
                            "name": "Christian Kirk (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "4": 1
                            }
                        },
                        "449.p.34107": {
                            "name": "Tyler Allgeier (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.40896": {
                            "name": "Jayden Daniels (QB)",
                            "total": 16,
                            "position": "QB",
                            "weekly": {
                                "4": 2,
                                "5": 1,
                                "6": 2,
                                "11": 1,
                                "12": 3,
                                "13": 4,
                                "17": 3
                            }
                        },
                        "449.p.40875": {
                            "name": "Bo Nix (QB)",
                            "total": 5,
                            "position": "QB",
                            "weekly": {
                                "8": 4,
                                "9": 1
                            }
                        },
                        "449.p.40883": {
                            "name": "Brian Thomas Jr. (WR)",
                            "total": 9,
                            "position": "WR",
                            "weekly": {
                                "4": 1,
                                "5": 1,
                                "7": 1,
                                "8": 1,
                                "13": 1,
                                "15": 2,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.40102": {
                            "name": "Tucker Kraft (TE)",
                            "total": 2,
                            "position": "TE",
                            "weekly": {
                                "12": 1,
                                "14": 1
                            }
                        },
                        "449.p.28442": {
                            "name": "Ameer Abdullah (RB)",
                            "total": 2,
                            "position": "RB",
                            "weekly": {
                                "12": 1,
                                "15": 1
                            }
                        },
                        "449.p.9265": {
                            "name": "Matthew Stafford (QB)",
                            "total": 3,
                            "position": "QB",
                            "weekly": {
                                "14": 2,
                                "16": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 74,
                    "players": {
                        "449.p.40075": {
                            "name": "Zach Charbonnet (RB)",
                            "total": 2,
                            "position": "RB",
                            "weekly": {
                                "3": 2
                            }
                        },
                        "449.p.34054": {
                            "name": "Brian Robinson Jr. (RB)",
                            "total": 7,
                            "position": "RB",
                            "weekly": {
                                "3": 1,
                                "4": 1,
                                "5": 2,
                                "7": 1,
                                "11": 1,
                                "13": 1
                            }
                        },
                        "449.p.34010": {
                            "name": "Trey McBride (TE)",
                            "total": 2,
                            "position": "TE",
                            "weekly": {
                                "9": 1,
                                "17": 1
                            }
                        },
                        "449.p.32692": {
                            "name": "Justin Jefferson (WR)",
                            "total": 10,
                            "position": "WR",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 1,
                                "4": 1,
                                "7": 1,
                                "14": 2,
                                "15": 1,
                                "16": 2
                            }
                        },
                        "449.p.31010": {
                            "name": "Courtland Sutton (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "6": 1,
                                "9": 1
                            }
                        },
                        "449.p.100008": {
                            "name": "Detroit (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "8": 1,
                                "9": 1
                            }
                        },
                        "449.p.30123": {
                            "name": "Patrick Mahomes (QB)",
                            "total": 22,
                            "position": "QB",
                            "weekly": {
                                "1": 1,
                                "2": 2,
                                "3": 2,
                                "4": 1,
                                "7": 1,
                                "11": 3,
                                "12": 3,
                                "13": 1,
                                "14": 1,
                                "15": 2,
                                "16": 2,
                                "17": 3
                            }
                        },
                        "449.p.34207": {
                            "name": "Isiah Pacheco (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "1": 1
                            }
                        },
                        "449.p.31868": {
                            "name": "Deebo Samuel (WR)",
                            "total": 4,
                            "position": "WR",
                            "weekly": {
                                "1": 1,
                                "6": 1,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.40039": {
                            "name": "Zay Flowers (WR)",
                            "total": 4,
                            "position": "W/R/T",
                            "weekly": {
                                "2": 1,
                                "9": 2,
                                "11": 1
                            }
                        },
                        "449.p.41048": {
                            "name": "Tyrone Tracy Jr. (RB)",
                            "total": 5,
                            "position": "RB",
                            "weekly": {
                                "6": 1,
                                "10": 1,
                                "13": 1,
                                "14": 1,
                                "16": 1
                            }
                        },
                        "449.p.32705": {
                            "name": "D'Andre Swift (RB)",
                            "total": 4,
                            "position": "RB",
                            "weekly": {
                                "5": 1,
                                "6": 1,
                                "8": 1,
                                "11": 1
                            }
                        },
                        "449.p.29235": {
                            "name": "Jared Goff (QB)",
                            "total": 6,
                            "position": "QB",
                            "weekly": {
                                "6": 3,
                                "8": 3
                            }
                        },
                        "449.p.100027": {
                            "name": "Tampa Bay (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.9265": {
                            "name": "Matthew Stafford (QB)",
                            "total": 2,
                            "position": "QB",
                            "weekly": {
                                "9": 2
                            }
                        }
                    }
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 73,
                    "players": {
                        "449.p.40042": {
                            "name": "Jordan Addison (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.34104": {
                            "name": "Khalil Shakir (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "14": 1,
                                "15": 1
                            }
                        },
                        "449.p.33399": {
                            "name": "Justin Fields (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "2": 1
                            }
                        },
                        "449.p.30199": {
                            "name": "Kareem Hunt (RB)",
                            "total": 3,
                            "position": "RB",
                            "weekly": {
                                "5": 1,
                                "8": 1,
                                "9": 1
                            }
                        },
                        "449.p.33996": {
                            "name": "Kenneth Walker III (RB)",
                            "total": 8,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "4": 3,
                                "6": 1,
                                "7": 2,
                                "11": 1
                            }
                        },
                        "449.p.31960": {
                            "name": "Tony Pollard (RB)",
                            "total": 4,
                            "position": "W/R/T",
                            "weekly": {
                                "4": 1,
                                "6": 1,
                                "12": 1,
                                "15": 1
                            }
                        },
                        "449.p.32676": {
                            "name": "Justin Herbert (QB)",
                            "total": 3,
                            "position": "QB",
                            "weekly": {
                                "11": 2,
                                "12": 1
                            }
                        },
                        "449.p.100007": {
                            "name": "Denver (DEF)",
                            "total": 5,
                            "position": "DEF",
                            "weekly": {
                                "5": 1,
                                "7": 1,
                                "13": 2,
                                "15": 1
                            }
                        },
                        "449.p.32675": {
                            "name": "Tua Tagovailoa (QB)",
                            "total": 8,
                            "position": "QB",
                            "weekly": {
                                "8": 1,
                                "9": 2,
                                "10": 1,
                                "14": 2,
                                "15": 1,
                                "16": 1
                            }
                        },
                        "449.p.30125": {
                            "name": "Deshaun Watson (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "1": 1
                            }
                        },
                        "449.p.32722": {
                            "name": "Cam Akers (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "3": 1
                            }
                        },
                        "449.p.40029": {
                            "name": "Bryce Young (QB)",
                            "total": 2,
                            "position": "QB",
                            "weekly": {
                                "17": 2
                            }
                        },
                        "449.p.40877": {
                            "name": "Xavier Worthy (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "8": 1
                            }
                        },
                        "449.p.40998": {
                            "name": "Isaac Guerendo (RB)",
                            "total": 2,
                            "position": "W/R/T",
                            "weekly": {
                                "14": 2
                            }
                        },
                        "449.p.26686": {
                            "name": "Travis Kelce (TE)",
                            "total": 3,
                            "position": "TE",
                            "weekly": {
                                "8": 1,
                                "10": 1,
                                "17": 1
                            }
                        },
                        "449.p.26699": {
                            "name": "Keenan Allen (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "6": 2
                            }
                        },
                        "449.p.31905": {
                            "name": "David Montgomery (RB)",
                            "total": 13,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 1,
                                "4": 1,
                                "6": 2,
                                "8": 2,
                                "10": 1,
                                "11": 2,
                                "12": 1,
                                "14": 1
                            }
                        },
                        "449.p.27564": {
                            "name": "Derek Carr (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "3": 1
                            }
                        },
                        "449.p.29399": {
                            "name": "Tyreek Hill (WR)",
                            "total": 6,
                            "position": "WR",
                            "weekly": {
                                "1": 1,
                                "10": 1,
                                "11": 1,
                                "13": 1,
                                "14": 1,
                                "16": 1
                            }
                        },
                        "449.p.26662": {
                            "name": "Geno Smith (QB)",
                            "total": 5,
                            "position": "QB",
                            "weekly": {
                                "4": 1,
                                "5": 1,
                                "6": 1,
                                "7": 2
                            }
                        }
                    }
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 80,
                    "players": {
                        "449.p.40064": {
                            "name": "Sam LaPorta (TE)",
                            "total": 5,
                            "position": "TE",
                            "weekly": {
                                "6": 1,
                                "8": 1,
                                "10": 1,
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.40093": {
                            "name": "Cedric Tillman (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "9": 1
                            }
                        },
                        "449.p.34047": {
                            "name": "Rachaad White (RB)",
                            "total": 7,
                            "position": "RB",
                            "weekly": {
                                "8": 1,
                                "9": 1,
                                "10": 1,
                                "12": 1,
                                "14": 2,
                                "15": 1
                            }
                        },
                        "449.p.33476": {
                            "name": "Trey Sermon (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.33443": {
                            "name": "Pat Freiermuth (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.33963": {
                            "name": "Drake London (WR)",
                            "total": 7,
                            "position": "WR",
                            "weekly": {
                                "2": 1,
                                "3": 1,
                                "5": 1,
                                "6": 1,
                                "7": 1,
                                "9": 1,
                                "15": 1
                            }
                        },
                        "449.p.33423": {
                            "name": "Javonte Williams (RB)",
                            "total": 3,
                            "position": "RB",
                            "weekly": {
                                "7": 2,
                                "11": 1
                            }
                        },
                        "449.p.30213": {
                            "name": "Jonnu Smith (TE)",
                            "total": 5,
                            "position": "TE",
                            "weekly": {
                                "11": 2,
                                "12": 1,
                                "14": 1,
                                "15": 1
                            }
                        },
                        "449.p.33967": {
                            "name": "Jameson Williams (WR)",
                            "total": 6,
                            "position": "W/R/T",
                            "weekly": {
                                "6": 1,
                                "11": 1,
                                "15": 1,
                                "16": 1,
                                "17": 2
                            }
                        },
                        "449.p.31934": {
                            "name": "Alexander Mattison (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "2": 1
                            }
                        },
                        "449.p.100012": {
                            "name": "Kansas City (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "2": 1
                            }
                        },
                        "449.p.29369": {
                            "name": "Dak Prescott (QB)",
                            "total": 10,
                            "position": "QB",
                            "weekly": {
                                "1": 1,
                                "2": 1,
                                "3": 3,
                                "4": 2,
                                "8": 2,
                                "9": 1
                            }
                        },
                        "449.p.27535": {
                            "name": "Mike Evans (WR)",
                            "total": 11,
                            "position": "WR",
                            "weekly": {
                                "1": 2,
                                "4": 1,
                                "5": 2,
                                "7": 1,
                                "13": 1,
                                "15": 2,
                                "17": 2
                            }
                        },
                        "449.p.8795": {
                            "name": "Joe Flacco (QB)",
                            "total": 3,
                            "position": "QB",
                            "weekly": {
                                "5": 3
                            }
                        },
                        "449.p.40993": {
                            "name": "Bucky Irving (RB)",
                            "total": 5,
                            "position": "RB",
                            "weekly": {
                                "6": 1,
                                "7": 1,
                                "12": 1,
                                "13": 1,
                                "16": 1
                            }
                        },
                        "449.p.40881": {
                            "name": "Drake Maye (QB)",
                            "total": 6,
                            "position": "QB",
                            "weekly": {
                                "7": 2,
                                "13": 1,
                                "16": 2,
                                "17": 1
                            }
                        },
                        "449.p.31838": {
                            "name": "Daniel Jones (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "10": 1
                            }
                        },
                        "449.p.28389": {
                            "name": "Jameis Winston (QB)",
                            "total": 5,
                            "position": "QB",
                            "weekly": {
                                "11": 2,
                                "12": 1,
                                "14": 2
                            }
                        },
                        "449.p.100014": {
                            "name": "Los Angeles (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "7": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 85,
                    "players": {
                        "449.p.31056": {
                            "name": "Mark Andrews (TE)",
                            "total": 8,
                            "position": "TE",
                            "weekly": {
                                "6": 1,
                                "7": 2,
                                "8": 1,
                                "10": 1,
                                "12": 1,
                                "13": 1,
                                "16": 1
                            }
                        },
                        "449.p.32711": {
                            "name": "Jonathan Taylor (RB)",
                            "total": 9,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "3": 2,
                                "4": 1,
                                "8": 1,
                                "13": 1,
                                "16": 3
                            }
                        },
                        "449.p.33965": {
                            "name": "Garrett Wilson (WR)",
                            "total": 7,
                            "position": "WR",
                            "weekly": {
                                "3": 1,
                                "5": 1,
                                "6": 1,
                                "9": 2,
                                "15": 1,
                                "17": 1
                            }
                        },
                        "449.p.30994": {
                            "name": "DJ Moore (WR)",
                            "total": 5,
                            "position": "W/R/T",
                            "weekly": {
                                "4": 1,
                                "5": 2,
                                "12": 1,
                                "13": 1
                            }
                        },
                        "449.p.33966": {
                            "name": "Chris Olave (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "3": 1
                            }
                        },
                        "449.p.33508": {
                            "name": "Rhamondre Stevenson (RB)",
                            "total": 6,
                            "position": "RB",
                            "weekly": {
                                "5": 1,
                                "8": 2,
                                "9": 2,
                                "16": 1
                            }
                        },
                        "449.p.29238": {
                            "name": "Ezekiel Elliott (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "8": 1
                            }
                        },
                        "449.p.100004": {
                            "name": "Cincinnati (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "15": 1
                            }
                        },
                        "449.p.34112": {
                            "name": "Jerome Ford (RB)",
                            "total": 3,
                            "position": "RB",
                            "weekly": {
                                "1": 1,
                                "15": 1,
                                "16": 1
                            }
                        },
                        "449.p.32671": {
                            "name": "Joe Burrow (QB)",
                            "total": 44,
                            "position": "QB",
                            "weekly": {
                                "2": 2,
                                "3": 3,
                                "4": 2,
                                "5": 5,
                                "6": 1,
                                "7": 2,
                                "8": 1,
                                "9": 5,
                                "10": 4,
                                "11": 3,
                                "13": 3,
                                "14": 3,
                                "15": 3,
                                "16": 3,
                                "17": 4
                            }
                        }
                    }
                }
            },
            "SK": "AWARD#TYPE#ACCUMULATIVE#ID#most-td-award"
        },
        {
            "entity_type": "award",
            "award_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 1783.68
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 1837.6000000000004
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 2033.2400000000005
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 1671.16
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 1975.2000000000005
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 2045.9000000000008
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 1709.6599999999992
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 1612.8799999999999
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 1753.76
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 1729.8200000000002
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 1706.760000000001
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 1641.0000000000007
                }
            },
            "created_at": "2025-11-30T19:31:32.210Z",
            "display_order": 1,
            "description": "Awarded to the manager who scored the most total points during the season (includes total BYE weeks).",
            "PK": "LEAGUE#yahoo#ID#449.l.607868",
            "name": "True Total Points Award",
            "award_data_weekly": {
                "1": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 76.42
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 107.66
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 140.02
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 75.4
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 106.77999999999999
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 113.08
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 89.62
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 138.57999999999998
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 96.13999999999999
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 112.46000000000001
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 72.46000000000001
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 67.76
                    }
                },
                "2": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 130.84
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 132
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 78.78
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 103.7
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 138.44
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 147.85999999999999
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 116.32000000000001
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 51.16
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 123.34
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 74.78
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 74.02000000000001
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 90.02
                    }
                },
                "3": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 99.83999999999999
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 106.3
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 146.2
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 93.32
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 113.98
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 105.02000000000001
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 101.44000000000001
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 64.68
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 89.88000000000001
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 76.28
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 69.66000000000001
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 110.46
                    }
                },
                "4": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 108.5
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 129.6
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 127.03999999999999
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 107.66000000000001
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 67.38
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 117.4
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 77.62
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 93.11999999999999
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 103.89999999999999
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 124.9
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 90.74
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 81.58
                    }
                },
                "5": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 120.66
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 98.34000000000002
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 111.62
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 92.6
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 99.50000000000001
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 126.14
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 68.06
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 114.62
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 100.84
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 120.76
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 126.75999999999999
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 136.48000000000002
                    }
                },
                "6": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 84.24000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 122.47999999999999
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 104.32000000000001
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 98.72
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 77.06
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 140.3
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 109.16
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 98.76
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 157.7
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 109.18
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 98.52
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 74.72
                    }
                },
                "7": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 91.44000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 118.03999999999999
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 124.53999999999999
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 88
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 128.7
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 90.42
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 111.36000000000001
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 83.34
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 70.86000000000001
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 97.88000000000001
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 119.04
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 74.34
                    }
                },
                "8": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 108.03999999999999
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 121.6
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 101.85999999999999
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 99.24000000000001
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 135.98
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 138.01999999999998
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 112.14000000000001
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 127.56
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 123.5
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 105.28
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 87.92
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 96.25999999999999
                    }
                },
                "9": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 79.24000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 97.03999999999999
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 153
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 121.52
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 114.56000000000002
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 133.9
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 131.8
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 54.71999999999999
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 124.78000000000002
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 99.03999999999999
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 76.82
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 111.34
                    }
                },
                "10": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 123.94
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 98.97999999999999
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 112.9
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 63.94
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 89.64
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 104.3
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 109.48
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 60.18
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 76.52000000000001
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 109.47999999999999
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 80.39999999999999
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 98.92
                    }
                },
                "11": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 110.06
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 114.28
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 119.58
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 91.69999999999999
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 161.84
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 96.98
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 101.54
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 60.24
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 95.83999999999999
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 105.67999999999999
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 145.4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 77.53999999999999
                    }
                },
                "12": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 91.80000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 90.78
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 129.08
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 97.36
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 127.9
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 84.06
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 56.760000000000005
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 126.79999999999998
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 91.36
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 99.61999999999999
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 97.46000000000001
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 74.25999999999999
                    }
                },
                "13": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 116.14
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 140.38
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 122.27999999999999
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 90.5
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 113.1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 89.32000000000001
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 86.42
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 91.33999999999999
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 121.94
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 97.88
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 135.32
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 108.56
                    }
                },
                "14": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 130.86
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 78.32000000000001
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 94.42
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 106.10000000000001
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 114.76000000000002
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 176.08
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 127.82
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 84.2
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 95.2
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 148.84000000000003
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 103.28
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 80.76
                    }
                },
                "15": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 120.63999999999999
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 103.33999999999999
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 113.9
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 126.71999999999998
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 104.96000000000001
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 163.68
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 123.1
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 108.30000000000001
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 72.76
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 77.54
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 106.74
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 104.13999999999999
                    }
                },
                "16": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 122.74
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 117.46
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 121.88000000000001
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 97.22
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 143.67999999999998
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 124.36
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 93.64000000000001
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 124.9
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 111.89999999999999
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 81.5
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 108.24
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 151.88
                    }
                },
                "17": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 68.28
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 61
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 131.82
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 117.46
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 136.94
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 94.98
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 93.38
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 130.38
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 97.3
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 88.72
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 113.98000000000002
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 101.97999999999999
                    }
                }
            },
            "variants": [
                {
                    "winners_weekly": {
                        "1": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 140.02,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "2": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 147.85999999999999,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "3": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 146.2,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "4": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 129.6,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "5": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 136.48000000000002,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "6": [
                            {
                                "teamName": "Off constantly",
                                "total": 157.7,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "7": [
                            {
                                "teamName": "Captain Amoeba 🥇🥇🏆",
                                "total": 128.7,
                                "id": "449.l.607868.t.6"
                            }
                        ],
                        "8": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 138.01999999999998,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "9": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 153,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "10": [
                            {
                                "teamName": "Big Chunk",
                                "total": 123.94,
                                "id": "449.l.607868.t.3"
                            }
                        ],
                        "11": [
                            {
                                "teamName": "Captain Amoeba 🥇🥇🏆",
                                "total": 161.84,
                                "id": "449.l.607868.t.6"
                            }
                        ],
                        "12": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 129.08,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "13": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 140.38,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "14": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 176.08,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "15": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 163.68,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "16": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 151.88,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "17": [
                            {
                                "teamName": "Captain Amoeba 🥇🥇🏆",
                                "total": 136.94,
                                "id": "449.l.607868.t.6"
                            }
                        ]
                    },
                    "winners_season": [
                        {
                            "teamName": "Dirty Dan",
                            "total": 2045.9000000000008,
                            "id": "449.l.607868.t.5"
                        }
                    ],
                    "copy": {
                        "icon": "🥇",
                        "season": "The highest-scoring squad across the season.",
                        "weekly": "{team_name} scored the most points this week."
                    },
                    "title": "Highest Scorer",
                    "key": "most_points_top",
                    "award_id": "total-points-award",
                    "direction": "top"
                },
                {
                    "winners_weekly": {
                        "1": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 67.76,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "2": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 51.16,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "3": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 64.68,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "4": [
                            {
                                "teamName": "Captain Amoeba 🥇🥇🏆",
                                "total": 67.38,
                                "id": "449.l.607868.t.6"
                            }
                        ],
                        "5": [
                            {
                                "teamName": "TruckBallz",
                                "total": 68.06,
                                "id": "449.l.607868.t.12"
                            }
                        ],
                        "6": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 74.72,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "7": [
                            {
                                "teamName": "Off constantly",
                                "total": 70.86000000000001,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "8": [
                            {
                                "teamName": "Kmetted to deep balls",
                                "total": 87.92,
                                "id": "449.l.607868.t.9"
                            }
                        ],
                        "9": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 54.71999999999999,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "10": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 60.18,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "11": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 60.24,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "12": [
                            {
                                "teamName": "TruckBallz",
                                "total": 56.760000000000005,
                                "id": "449.l.607868.t.12"
                            }
                        ],
                        "13": [
                            {
                                "teamName": "TruckBallz",
                                "total": 86.42,
                                "id": "449.l.607868.t.12"
                            }
                        ],
                        "14": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 78.32000000000001,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "15": [
                            {
                                "teamName": "Off constantly",
                                "total": 72.76,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "16": [
                            {
                                "teamName": "THE HAMMER 🥇🥈🥇",
                                "total": 81.5,
                                "id": "449.l.607868.t.10"
                            }
                        ],
                        "17": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 61,
                                "id": "449.l.607868.t.2"
                            }
                        ]
                    },
                    "winners_season": [
                        {
                            "teamName": "Da Mayor of TD City",
                            "total": 1612.8799999999999,
                            "id": "449.l.607868.t.4"
                        }
                    ],
                    "copy": {
                        "icon": "🚽",
                        "season": "The lowest total points across the season.",
                        "weekly": "{team_name} posted the fewest points this week."
                    },
                    "title": "Lowest Scorer",
                    "key": "most_points_bottom",
                    "award_id": "total-points-award",
                    "direction": "bottom"
                }
            ],
            "SK": "AWARD#TYPE#ACCUMULATIVE#ID#total-points-award"
        },
        {
            "entity_type": "award",
            "award_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 3
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 4
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 2
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 8
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 2
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 3
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 6
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 3
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 4
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 2
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 5
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 9
                }
            },
            "created_at": "2025-11-30T19:31:33.136Z",
            "variants": [
                {
                    "winners_weekly": {
                        "1": [
                            {
                                "teamName": "Kmetted to deep balls",
                                "total": 1,
                                "id": "449.l.607868.t.9"
                            }
                        ],
                        "2": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 0,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "3": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 2,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "4": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 1,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "5": [
                            {
                                "teamName": "Mel🥇",
                                "total": 1,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "6": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 2,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "7": [
                            {
                                "teamName": "Mel🥇",
                                "total": 2,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "8": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 1,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "9": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 1,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "10": [
                            {
                                "teamName": "Mel🥇",
                                "total": 1,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "11": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 1,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "12": [
                            {
                                "teamName": "TruckBallz",
                                "total": 3,
                                "id": "449.l.607868.t.12"
                            }
                        ],
                        "13": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 1,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "14": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 1,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "15": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 1,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "16": [
                            {
                                "teamName": "Mel🥇",
                                "total": 1,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "17": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 1,
                                "id": "449.l.607868.t.2"
                            }
                        ]
                    },
                    "winners_season": [
                        {
                            "teamName": "Probably Trash 🥈",
                            "total": 9,
                            "id": "449.l.607868.t.8"
                        }
                    ],
                    "copy": {
                        "icon": "🍩",
                        "season": "The team that led the league in 0.0 or negative-point performances all season.",
                        "weekly": "{team_name} stacked the most 0-point (or worse) starts this week."
                    },
                    "title": "Goose Egg Collector",
                    "key": "zero_points_top",
                    "award_id": "zero-points-award",
                    "direction": "top"
                }
            ],
            "display_order": 1,
            "player_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 3,
                    "players": {
                        "449.p.29792": {
                            "name": "Ka'imi Fairbairn (K)",
                            "total": 1,
                            "position": "K",
                            "weekly": {
                                "17": 1
                            }
                        },
                        "449.p.34019": {
                            "name": "James Cook III (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.100003": {
                            "name": "Chicago (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "14": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 4,
                    "players": {
                        "449.p.40926": {
                            "name": "Jonathon Brooks (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "14": 1
                            }
                        },
                        "449.p.100020": {
                            "name": "New York (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "17": 1
                            }
                        },
                        "449.p.40893": {
                            "name": "Marvin Harrison Jr. (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.32756": {
                            "name": "Zack Moss (RB)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "6": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 2,
                    "players": {
                        "449.p.40063": {
                            "name": "Jayden Reed (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "14": 1
                            }
                        },
                        "449.p.31019": {
                            "name": "Dallas Goedert (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "6": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 8,
                    "players": {
                        "449.p.100022": {
                            "name": "Arizona (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "14": 1,
                                "16": 1
                            }
                        },
                        "449.p.40214": {
                            "name": "Anders Carlson (K)",
                            "total": 1,
                            "position": "K",
                            "weekly": {
                                "17": 1
                            }
                        },
                        "449.p.32725": {
                            "name": "J.K. Dobbins (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "5": 1
                            }
                        },
                        "449.p.40097": {
                            "name": "Tank Dell (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "7": 1
                            }
                        },
                        "449.p.100020": {
                            "name": "New York (DEF)",
                            "total": 2,
                            "position": "DEF",
                            "weekly": {
                                "7": 1,
                                "10": 1
                            }
                        },
                        "449.p.30971": {
                            "name": "Baker Mayfield (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "11": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 2,
                    "players": {
                        "449.p.40084": {
                            "name": "Rashee Rice (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "4": 1
                            }
                        },
                        "449.p.30182": {
                            "name": "Cooper Kupp (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "15": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 3,
                    "players": {
                        "449.p.41464": {
                            "name": "Carson Steele (RB)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "4": 1
                            }
                        },
                        "449.p.32843": {
                            "name": "Darnell Mooney (WR)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "15": 1
                            }
                        },
                        "449.p.40102": {
                            "name": "Tucker Kraft (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "11": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 6,
                    "players": {
                        "449.p.31934": {
                            "name": "Alexander Mattison (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "12": 1
                            }
                        },
                        "449.p.34062": {
                            "name": "Cade Otton (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "17": 1
                            }
                        },
                        "449.p.33413": {
                            "name": "Travis Etienne Jr. (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.40892": {
                            "name": "Ricky Pearsall (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "11": 1,
                                "12": 1
                            }
                        },
                        "449.p.33537": {
                            "name": "Evan McPherson (K)",
                            "total": 1,
                            "position": "K",
                            "weekly": {
                                "12": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 3,
                    "players": {
                        "449.p.33392": {
                            "name": "Kyle Pitts Sr. (TE)",
                            "total": 1,
                            "position": "TE",
                            "weekly": {
                                "4": 1
                            }
                        },
                        "449.p.100015": {
                            "name": "Miami (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "13": 1
                            }
                        },
                        "449.p.100006": {
                            "name": "Dallas (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "3": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 4,
                    "players": {
                        "449.p.100008": {
                            "name": "Detroit (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "15": 1
                            }
                        },
                        "449.p.30426": {
                            "name": "Younghoe Koo (K)",
                            "total": 2,
                            "position": "K",
                            "weekly": {
                                "16": 1,
                                "17": 1
                            }
                        },
                        "449.p.31868": {
                            "name": "Deebo Samuel (WR)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "7": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 2,
                    "players": {
                        "449.p.100011": {
                            "name": "Indianapolis (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "17": 1
                            }
                        },
                        "449.p.40051": {
                            "name": "Quentin Johnston (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "12": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 5,
                    "players": {
                        "449.p.100029": {
                            "name": "Carolina (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "17": 1
                            }
                        },
                        "449.p.100013": {
                            "name": "Las Vegas (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "3": 1
                            }
                        },
                        "449.p.28392": {
                            "name": "Amari Cooper (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "10": 1
                            }
                        },
                        "449.p.28389": {
                            "name": "Jameis Winston (QB)",
                            "total": 1,
                            "position": "QB",
                            "weekly": {
                                "15": 1
                            }
                        },
                        "449.p.40998": {
                            "name": "Isaac Guerendo (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "1": 1
                            }
                        }
                    }
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 9,
                    "players": {
                        "449.p.31056": {
                            "name": "Mark Andrews (TE)",
                            "total": 2,
                            "position": "TE",
                            "weekly": {
                                "3": 1,
                                "4": 1
                            }
                        },
                        "449.p.32711": {
                            "name": "Jonathan Taylor (RB)",
                            "total": 1,
                            "position": "W/R/T",
                            "weekly": {
                                "7": 1
                            }
                        },
                        "449.p.31898": {
                            "name": "Diontae Johnson (WR)",
                            "total": 2,
                            "position": "WR",
                            "weekly": {
                                "8": 1,
                                "12": 1
                            }
                        },
                        "449.p.33966": {
                            "name": "Chris Olave (WR)",
                            "total": 1,
                            "position": "WR",
                            "weekly": {
                                "6": 1
                            }
                        },
                        "449.p.29238": {
                            "name": "Ezekiel Elliott (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "9": 1
                            }
                        },
                        "449.p.100004": {
                            "name": "Cincinnati (DEF)",
                            "total": 1,
                            "position": "DEF",
                            "weekly": {
                                "3": 1
                            }
                        },
                        "449.p.34112": {
                            "name": "Jerome Ford (RB)",
                            "total": 1,
                            "position": "RB",
                            "weekly": {
                                "7": 1
                            }
                        }
                    }
                }
            },
            "description": "Awarded to the manager whose starters recorded the most 0.0 or negative-point performances during the season.",
            "PK": "LEAGUE#yahoo#ID#449.l.607868",
            "name": "Most Zero Points Award",
            "award_data_weekly": {
                "1": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 1
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "2": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "3": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 1
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 1
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 2
                    }
                },
                "4": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 1
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 1
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 1
                    }
                },
                "5": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 1
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "6": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 1
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 2
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 1
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 1
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 1
                    }
                },
                "7": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 2
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 2
                    }
                },
                "8": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 1
                    }
                },
                "9": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 1
                    }
                },
                "10": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 1
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 1
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "11": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 1
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 1
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 1
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "12": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 3
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 1
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 1
                    }
                },
                "13": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 1
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "14": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 1
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 1
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 1
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 1
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 0
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "15": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 1
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 1
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "16": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 0
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 1
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 0
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 0
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 0
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "17": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 1
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 1
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 0
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 1
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 0
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 0
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 1
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 0
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 1
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 1
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                }
            },
            "SK": "AWARD#TYPE#ACCUMULATIVE#ID#zero-points-award"
        },
        {
            "entity_type": "award",
            "award_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 249.18
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 221.4
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 423.42
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 296.78000000000003
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 285.1000000000001
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 391.40000000000003
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 344.1600000000001
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 304.78
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 291.5
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 251.60000000000002
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 261.46
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 370.59999999999997
                }
            },
            "created_at": "2025-11-30T19:31:31.055Z",
            "display_order": 2,
            "description": "Awarded to the manager with the most points from the QB position during the season.",
            "PK": "LEAGUE#yahoo#ID#449.l.607868",
            "name": "Best QB Points",
            "award_data_weekly": {
                "1": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 7.22
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 18.66
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 25.12
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 16.4
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 14.18
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 31.18
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 16.42
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 26.08
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 14.64
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 10.66
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 11.46
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 8.06
                    }
                },
                "2": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 15.14
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 14.3
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 16.38
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 18.8
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 28.54
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 9.76
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 23.82
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 9.86
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 12.94
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 11.38
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 12.92
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 17.22
                    }
                },
                "3": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 21.04
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 9.8
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 25.98
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 8.52
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 14.78
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 30.92
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 10.94
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 5.08
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 16.38
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 7.98
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 29.86
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 25.36
                    }
                },
                "4": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 11.6
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 23.5
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 23.64
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 28.88
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 9.98
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 7.3
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 16.32
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 24.02
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 13
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 21.6
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 16.74
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 16.28
                    }
                },
                "5": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 11.76
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 15.94
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 33.42
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 23.4
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 24.1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 14.64
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 4.26
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 19.72
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 13.44
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 22.56
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 26.56
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 33.78
                    }
                },
                "6": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 28.64
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 18.38
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 18.92
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 25.62
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 11.96
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 24.4
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 21.86
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 20.96
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 25.1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 12.48
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 3.22
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 19.82
                    }
                },
                "7": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 13.04
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 5.34
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 34.44
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 16.8
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 20.2
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 21.02
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 22.76
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 5.24
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 12.06
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 17.78
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 20.84
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 14.94
                    }
                },
                "8": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 9.94
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 12.4
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 24.16
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 5.74
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 22.18
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 19.82
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 35.14
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 29.76
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 15.5
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 14.66
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 13.62
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 12.86
                    }
                },
                "9": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 20.34
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 11.54
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 23.6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 10.92
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 4.76
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 22.1
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 29.9
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 17.22
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 17.92
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 17.54
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 12.32
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 29.14
                    }
                },
                "10": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 4.04
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 9.78
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 32.9
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 8.94
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 28.74
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 18.2
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 29.68
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 8.58
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 9.72
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 8.18
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 12.2
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 33.72
                    }
                },
                "11": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 16.06
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 10.88
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 14.88
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 0
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 15.74
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 23.98
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 18.74
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 13.44
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 15.84
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 24.38
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 26.6
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 29.04
                    }
                },
                "12": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 26.9
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 15.68
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 22.58
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 18.66
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 10.3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 12.36
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 15.06
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 30.4
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 28.76
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 17.62
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 13.46
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 10.76
                    }
                },
                "13": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 26.14
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 14.38
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 25.38
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 10.2
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 15.2
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 28.42
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 17.62
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 27.64
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 16.64
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 7.98
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 19.42
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 19.26
                    }
                },
                "14": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 14.06
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 7.02
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 16.02
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 19
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 17.96
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 51.88
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 24.22
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 20.8
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 14.1
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 23.54
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 15.28
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 24.56
                    }
                },
                "15": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 9.94
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 11.64
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 36.1
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 28.02
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 10.06
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 41.28
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 28.1
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 8.2
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 15.76
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 3.84
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": -0.36
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 16.84
                    }
                },
                "16": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 12.84
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 16.06
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 20.48
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 22.32
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 20.38
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 11.16
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 4.54
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 6
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 23.7
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 12.5
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 17.44
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 21.98
                    }
                },
                "17": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 0.48
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 6.1
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 29.42
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 34.56
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 16.04
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 22.98
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 24.78
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 31.78
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 26
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 16.92
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 9.88
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 36.98
                    }
                }
            },
            "variants": [
                {
                    "winners_weekly": {
                        "1": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 31.18,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "2": [
                            {
                                "teamName": "Captain Amoeba 🥇🥇🏆",
                                "total": 28.54,
                                "id": "449.l.607868.t.6"
                            }
                        ],
                        "3": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 30.92,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "4": [
                            {
                                "teamName": "Mel🥇",
                                "total": 28.88,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "5": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 33.78,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "6": [
                            {
                                "teamName": "Big Chunk",
                                "total": 28.64,
                                "id": "449.l.607868.t.3"
                            }
                        ],
                        "7": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 34.44,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "8": [
                            {
                                "teamName": "TruckBallz",
                                "total": 35.14,
                                "id": "449.l.607868.t.12"
                            }
                        ],
                        "9": [
                            {
                                "teamName": "TruckBallz",
                                "total": 29.9,
                                "id": "449.l.607868.t.12"
                            }
                        ],
                        "10": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 33.72,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "11": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 29.04,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "12": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 30.4,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "13": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 28.42,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "14": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 51.88,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "15": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 41.28,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "16": [
                            {
                                "teamName": "Off constantly",
                                "total": 23.7,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "17": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 36.98,
                                "id": "449.l.607868.t.8"
                            }
                        ]
                    },
                    "winners_season": [
                        {
                            "teamName": "The Dicktator 🥇🥉🚽",
                            "total": 423.42,
                            "id": "449.l.607868.t.1"
                        }
                    ],
                    "copy": {
                        "icon": "🎯",
                        "season": "The team that banked the most QB points all season.",
                        "weekly": "{team_name} squeezed the most QB points this week."
                    },
                    "title": "QB Points Leader",
                    "key": "qb_most_points_top",
                    "award_id": "qb-most-points-award",
                    "direction": "top"
                }
            ],
            "player_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 249.18,
                    "players": {
                        "449.p.40900": {
                            "name": "Caleb Williams (QB)",
                            "total": 122.83999999999999,
                            "position": "QB",
                            "weekly": {
                                "1": 7.22,
                                "6": 28.64,
                                "8": 9.94,
                                "12": 26.9,
                                "13": 26.14,
                                "14": 14.06,
                                "15": 9.94
                            }
                        },
                        "449.p.7200": {
                            "name": "Aaron Rodgers (QB)",
                            "total": 126.34000000000002,
                            "position": "QB",
                            "weekly": {
                                "2": 15.14,
                                "3": 21.04,
                                "4": 11.6,
                                "5": 11.76,
                                "7": 13.04,
                                "9": 20.34,
                                "10": 4.04,
                                "11": 16.06,
                                "16": 12.84,
                                "17": 0.48
                            }
                        }
                    }
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 221.4,
                    "players": {
                        "449.p.40030": {
                            "name": "C.J. Stroud (QB)",
                            "total": 214.38000000000002,
                            "position": "QB",
                            "weekly": {
                                "1": 18.66,
                                "2": 14.3,
                                "3": 9.8,
                                "4": 23.5,
                                "5": 15.94,
                                "6": 18.38,
                                "7": 5.34,
                                "8": 12.4,
                                "9": 11.54,
                                "10": 9.78,
                                "11": 10.88,
                                "12": 15.68,
                                "13": 14.38,
                                "15": 11.64,
                                "16": 16.06,
                                "17": 6.1
                            }
                        },
                        "449.p.40068": {
                            "name": "Will Levis (QB)",
                            "total": 7.02,
                            "position": "QB",
                            "weekly": {
                                "14": 7.02
                            }
                        }
                    }
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 423.42,
                    "players": {
                        "449.p.31002": {
                            "name": "Lamar Jackson (QB)",
                            "total": 407.40000000000003,
                            "position": "QB",
                            "weekly": {
                                "1": 25.12,
                                "2": 16.38,
                                "3": 25.98,
                                "4": 23.64,
                                "5": 33.42,
                                "6": 18.92,
                                "7": 34.44,
                                "8": 24.16,
                                "9": 23.6,
                                "10": 32.9,
                                "11": 14.88,
                                "12": 22.58,
                                "13": 25.38,
                                "15": 36.1,
                                "16": 20.48,
                                "17": 29.42
                            }
                        },
                        "449.p.25785": {
                            "name": "Russell Wilson (QB)",
                            "total": 16.02,
                            "position": "QB",
                            "weekly": {
                                "14": 16.02
                            }
                        }
                    }
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 296.78000000000003,
                    "players": {
                        "449.p.32696": {
                            "name": "Jordan Love (QB)",
                            "total": 75.47999999999999,
                            "position": "QB",
                            "weekly": {
                                "1": 16.4,
                                "6": 25.62,
                                "7": 16.8,
                                "8": 5.74,
                                "9": 10.92
                            }
                        },
                        "449.p.30971": {
                            "name": "Baker Mayfield (QB)",
                            "total": 221.29999999999998,
                            "position": "QB",
                            "weekly": {
                                "2": 18.8,
                                "3": 8.52,
                                "4": 28.88,
                                "5": 23.4,
                                "10": 8.94,
                                "11": 0,
                                "12": 18.66,
                                "13": 10.2,
                                "14": 19,
                                "15": 28.02,
                                "16": 22.32,
                                "17": 34.56
                            }
                        }
                    }
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 285.1000000000001,
                    "players": {
                        "449.p.31833": {
                            "name": "Kyler Murray (QB)",
                            "total": 269.36,
                            "position": "QB",
                            "weekly": {
                                "1": 14.18,
                                "2": 28.54,
                                "3": 14.78,
                                "4": 9.98,
                                "5": 24.1,
                                "6": 11.96,
                                "7": 20.2,
                                "8": 22.18,
                                "9": 4.76,
                                "10": 28.74,
                                "12": 10.3,
                                "13": 15.2,
                                "14": 17.96,
                                "15": 10.06,
                                "16": 20.38,
                                "17": 16.04
                            }
                        },
                        "449.p.26662": {
                            "name": "Geno Smith (QB)",
                            "total": 15.74,
                            "position": "QB",
                            "weekly": {
                                "11": 15.74
                            }
                        }
                    }
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 391.40000000000003,
                    "players": {
                        "449.p.30977": {
                            "name": "Josh Allen (QB)",
                            "total": 379.04,
                            "position": "QB",
                            "weekly": {
                                "1": 31.18,
                                "2": 9.76,
                                "3": 30.92,
                                "4": 7.3,
                                "5": 14.64,
                                "6": 24.4,
                                "7": 21.02,
                                "8": 19.82,
                                "9": 22.1,
                                "10": 18.2,
                                "11": 23.98,
                                "13": 28.42,
                                "14": 51.88,
                                "15": 41.28,
                                "16": 11.16,
                                "17": 22.98
                            }
                        },
                        "449.p.26662": {
                            "name": "Geno Smith (QB)",
                            "total": 12.36,
                            "position": "QB",
                            "weekly": {
                                "12": 12.36
                            }
                        }
                    }
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 344.1600000000001,
                    "players": {
                        "449.p.30973": {
                            "name": "Sam Darnold (QB)",
                            "total": 29.04,
                            "position": "QB",
                            "weekly": {
                                "5": 4.26,
                                "17": 24.78
                            }
                        },
                        "449.p.32723": {
                            "name": "Jalen Hurts (QB)",
                            "total": 315.12000000000006,
                            "position": "QB",
                            "weekly": {
                                "1": 16.42,
                                "2": 23.82,
                                "3": 10.94,
                                "4": 16.32,
                                "6": 21.86,
                                "7": 22.76,
                                "8": 35.14,
                                "9": 29.9,
                                "10": 29.68,
                                "11": 18.74,
                                "12": 15.06,
                                "13": 17.62,
                                "14": 24.22,
                                "15": 28.1,
                                "16": 4.54
                            }
                        }
                    }
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 304.78,
                    "players": {
                        "449.p.40896": {
                            "name": "Jayden Daniels (QB)",
                            "total": 181.78,
                            "position": "QB",
                            "weekly": {
                                "4": 24.02,
                                "5": 19.72,
                                "6": 20.96,
                                "7": 5.24,
                                "10": 8.58,
                                "11": 13.44,
                                "12": 30.4,
                                "13": 27.64,
                                "17": 31.78
                            }
                        },
                        "449.p.40875": {
                            "name": "Bo Nix (QB)",
                            "total": 46.980000000000004,
                            "position": "QB",
                            "weekly": {
                                "8": 29.76,
                                "9": 17.22
                            }
                        },
                        "449.p.40040": {
                            "name": "Anthony Richardson Sr. (QB)",
                            "total": 41.019999999999996,
                            "position": "QB",
                            "weekly": {
                                "1": 26.08,
                                "2": 9.86,
                                "3": 5.08
                            }
                        },
                        "449.p.9265": {
                            "name": "Matthew Stafford (QB)",
                            "total": 35,
                            "position": "QB",
                            "weekly": {
                                "14": 20.8,
                                "15": 8.2,
                                "16": 6
                            }
                        }
                    }
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 291.5,
                    "players": {
                        "449.p.29235": {
                            "name": "Jared Goff (QB)",
                            "total": 40.6,
                            "position": "QB",
                            "weekly": {
                                "6": 25.1,
                                "8": 15.5
                            }
                        },
                        "449.p.30123": {
                            "name": "Patrick Mahomes (QB)",
                            "total": 223.25999999999996,
                            "position": "QB",
                            "weekly": {
                                "1": 14.64,
                                "2": 12.94,
                                "3": 16.38,
                                "4": 13,
                                "5": 13.44,
                                "7": 12.06,
                                "11": 15.84,
                                "12": 28.76,
                                "13": 16.64,
                                "14": 14.1,
                                "15": 15.76,
                                "16": 23.7,
                                "17": 26
                            }
                        },
                        "449.p.9265": {
                            "name": "Matthew Stafford (QB)",
                            "total": 27.64,
                            "position": "QB",
                            "weekly": {
                                "9": 17.92,
                                "10": 9.72
                            }
                        }
                    }
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 251.60000000000002,
                    "players": {
                        "449.p.33399": {
                            "name": "Justin Fields (QB)",
                            "total": 11.38,
                            "position": "QB",
                            "weekly": {
                                "2": 11.38
                            }
                        },
                        "449.p.32676": {
                            "name": "Justin Herbert (QB)",
                            "total": 49.980000000000004,
                            "position": "QB",
                            "weekly": {
                                "11": 24.38,
                                "12": 17.62,
                                "13": 7.98
                            }
                        },
                        "449.p.32675": {
                            "name": "Tua Tagovailoa (QB)",
                            "total": 80.26,
                            "position": "QB",
                            "weekly": {
                                "8": 14.66,
                                "9": 17.54,
                                "10": 8.18,
                                "14": 23.54,
                                "15": 3.84,
                                "16": 12.5
                            }
                        },
                        "449.p.30125": {
                            "name": "Deshaun Watson (QB)",
                            "total": 10.66,
                            "position": "QB",
                            "weekly": {
                                "1": 10.66
                            }
                        },
                        "449.p.40029": {
                            "name": "Bryce Young (QB)",
                            "total": 16.92,
                            "position": "QB",
                            "weekly": {
                                "17": 16.92
                            }
                        },
                        "449.p.27564": {
                            "name": "Derek Carr (QB)",
                            "total": 7.98,
                            "position": "QB",
                            "weekly": {
                                "3": 7.98
                            }
                        },
                        "449.p.26662": {
                            "name": "Geno Smith (QB)",
                            "total": 74.42,
                            "position": "QB",
                            "weekly": {
                                "4": 21.6,
                                "5": 22.56,
                                "6": 12.48,
                                "7": 17.78
                            }
                        }
                    }
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 261.46,
                    "players": {
                        "449.p.29369": {
                            "name": "Dak Prescott (QB)",
                            "total": 100.14000000000001,
                            "position": "QB",
                            "weekly": {
                                "1": 11.46,
                                "2": 12.92,
                                "3": 29.86,
                                "4": 16.74,
                                "6": 3.22,
                                "8": 13.62,
                                "9": 12.32
                            }
                        },
                        "449.p.8795": {
                            "name": "Joe Flacco (QB)",
                            "total": 26.56,
                            "position": "QB",
                            "weekly": {
                                "5": 26.56
                            }
                        },
                        "449.p.40881": {
                            "name": "Drake Maye (QB)",
                            "total": 67.58,
                            "position": "QB",
                            "weekly": {
                                "7": 20.84,
                                "13": 19.42,
                                "16": 17.44,
                                "17": 9.88
                            }
                        },
                        "449.p.31838": {
                            "name": "Daniel Jones (QB)",
                            "total": 12.2,
                            "position": "QB",
                            "weekly": {
                                "10": 12.2
                            }
                        },
                        "449.p.28389": {
                            "name": "Jameis Winston (QB)",
                            "total": 54.980000000000004,
                            "position": "QB",
                            "weekly": {
                                "11": 26.6,
                                "12": 13.46,
                                "14": 15.28,
                                "15": -0.36
                            }
                        }
                    }
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 370.59999999999997,
                    "players": {
                        "449.p.40533": {
                            "name": "Tommy DeVito (QB)",
                            "total": 10.76,
                            "position": "QB",
                            "weekly": {
                                "12": 10.76
                            }
                        },
                        "449.p.32671": {
                            "name": "Joe Burrow (QB)",
                            "total": 359.84,
                            "position": "QB",
                            "weekly": {
                                "1": 8.06,
                                "2": 17.22,
                                "3": 25.36,
                                "4": 16.28,
                                "5": 33.78,
                                "6": 19.82,
                                "7": 14.94,
                                "8": 12.86,
                                "9": 29.14,
                                "10": 33.72,
                                "11": 29.04,
                                "13": 19.26,
                                "14": 24.56,
                                "15": 16.84,
                                "16": 21.98,
                                "17": 36.98
                            }
                        }
                    }
                }
            },
            "SK": "AWARD#TYPE#ACCUMULATIVE#ID#qb-most-points-award"
        },
        {
            "entity_type": "award",
            "award_data": {
                "449.l.607868.t.3": {
                    "teamName": "Big Chunk",
                    "total": 681.8600000000001
                },
                "449.l.607868.t.2": {
                    "teamName": "BLaZiNgGLoRy 🥈",
                    "total": 623.9800000000001
                },
                "449.l.607868.t.1": {
                    "teamName": "The Dicktator 🥇🥉🚽",
                    "total": 770.8800000000001
                },
                "449.l.607868.t.7": {
                    "teamName": "Mel🥇",
                    "total": 836.1800000000001
                },
                "449.l.607868.t.6": {
                    "teamName": "Captain Amoeba 🥇🥇🏆",
                    "total": 673.9999999999999
                },
                "449.l.607868.t.5": {
                    "teamName": "Dirty Dan",
                    "total": 626.2800000000002
                },
                "449.l.607868.t.12": {
                    "teamName": "TruckBallz",
                    "total": 631.86
                },
                "449.l.607868.t.4": {
                    "teamName": "Da Mayor of TD City",
                    "total": 625.3400000000003
                },
                "449.l.607868.t.11": {
                    "teamName": "Off constantly",
                    "total": 914.1200000000002
                },
                "449.l.607868.t.10": {
                    "teamName": "THE HAMMER 🥇🥈🥇",
                    "total": 750.3999999999997
                },
                "449.l.607868.t.9": {
                    "teamName": "Kmetted to deep balls",
                    "total": 592.98
                },
                "449.l.607868.t.8": {
                    "teamName": "Probably Trash 🥈",
                    "total": 522.5
                }
            },
            "created_at": "2025-11-30T19:31:32.331Z",
            "display_order": 9,
            "description": "Awarded to the manager who scored the most total points on their bench.",
            "PK": "LEAGUE#yahoo#ID#449.l.607868",
            "name": "Bench Strength Award",
            "award_data_weekly": {
                "1": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 38.48
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 45.36
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 47.839999999999996
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 74.26
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 26.6
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 45.78
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 43.32
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 46.160000000000004
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 62.98
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 48.4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 52.9
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 56.78
                    }
                },
                "2": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 28.360000000000003
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 18.8
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 56.86
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 39.199999999999996
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 30.700000000000003
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 30.14
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 45.3
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 34.739999999999995
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 48.58
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 45.36
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 32.4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 58.1
                    }
                },
                "3": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 67.32000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 21.4
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 78.98
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 47.8
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 46.1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 40.34
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 56.64
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 39.16
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 68.86
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 18.36
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 63.099999999999994
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 35.519999999999996
                    }
                },
                "4": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 22.48
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 49.28
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 58
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 43.86
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 59.9
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 31.32
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 44.7
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 18.04
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 76.67999999999999
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 45.06
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 53.8
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 53.56
                    }
                },
                "5": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 55.16
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 64.64
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 31.64
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 38.160000000000004
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 9.899999999999999
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 42.76
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 16.2
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 3.5
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 23.700000000000003
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 41
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 38.18
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 45.54
                    }
                },
                "6": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 45.46000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 34.599999999999994
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 53.9
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 44.8
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 7.1
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 40.800000000000004
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 44.5
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 26.2
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 12.9
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 2.4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 11.7
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 41.66
                    }
                },
                "7": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 16
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 20
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 40.68
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 49.9
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 10.799999999999999
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 37.480000000000004
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 34.36
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 30.060000000000002
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 27.46
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 61.400000000000006
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 49.900000000000006
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 15.02
                    }
                },
                "8": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 42.22
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 33
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 29.22
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 83.8
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 36.5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 43.71999999999999
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 63.60000000000001
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 36.239999999999995
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 95.16000000000001
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 56.38
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 17.82
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 52.42
                    }
                },
                "9": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 61.38
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 25.380000000000003
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 6.2
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 60.3
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 50.2
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 32
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 19
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 36.46
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 51.540000000000006
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 49.82
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 17.2
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 26.06
                    }
                },
                "10": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 43.300000000000004
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 23.04
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 40.6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 27.299999999999997
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 17.2
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 55.82
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 13.74
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 27.400000000000002
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 48.440000000000005
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 11.600000000000001
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 40.66
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 1.1
                    }
                },
                "11": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 34.64
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 55.040000000000006
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 44.6
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 56.03999999999999
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 32.3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 31.46
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 53.04
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 31.98
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 76.58000000000001
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 66.32
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 24.48
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 5.9
                    }
                },
                "12": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 13.600000000000001
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 24.880000000000003
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 33
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 72.92
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 60.5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": -2
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 33.7
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 39.120000000000005
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 45.059999999999995
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 72.28
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 27.580000000000002
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 14.5
                    }
                },
                "13": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 37.400000000000006
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 60.56
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 94.85999999999999
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 28.86
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 81.5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 22.8
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 34.6
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 32.06
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 57.84
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 54.4
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 63.78
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 7.340000000000001
                    }
                },
                "14": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 35.76
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 1.9
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 29.1
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 14.54
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 53.5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 50.620000000000005
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 30.58
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 16.299999999999997
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 22.02
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 63.419999999999995
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 20.4
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 0
                    }
                },
                "15": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 54.56
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 39.88
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 38.120000000000005
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 39.46
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 53.3
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 11.540000000000001
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 33.54
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 89.74
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 75.26
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 38.2
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 35.379999999999995
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 37.7
                    }
                },
                "16": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 50.86
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 54.36
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 49.78
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 63.18
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 25.5
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 56.22
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 30.14
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 68.12
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 62.63999999999999
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 42.400000000000006
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 19.5
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 23.3
                    }
                },
                "17": {
                    "449.l.607868.t.3": {
                        "teamName": "Big Chunk",
                        "total": 34.879999999999995
                    },
                    "449.l.607868.t.2": {
                        "teamName": "BLaZiNgGLoRy 🥈",
                        "total": 51.86
                    },
                    "449.l.607868.t.1": {
                        "teamName": "The Dicktator 🥇🥉🚽",
                        "total": 37.5
                    },
                    "449.l.607868.t.7": {
                        "teamName": "Mel🥇",
                        "total": 51.8
                    },
                    "449.l.607868.t.6": {
                        "teamName": "Captain Amoeba 🥇🥇🏆",
                        "total": 72.4
                    },
                    "449.l.607868.t.5": {
                        "teamName": "Dirty Dan",
                        "total": 55.480000000000004
                    },
                    "449.l.607868.t.12": {
                        "teamName": "TruckBallz",
                        "total": 34.9
                    },
                    "449.l.607868.t.4": {
                        "teamName": "Da Mayor of TD City",
                        "total": 50.059999999999995
                    },
                    "449.l.607868.t.11": {
                        "teamName": "Off constantly",
                        "total": 58.42
                    },
                    "449.l.607868.t.10": {
                        "teamName": "THE HAMMER 🥇🥈🥇",
                        "total": 33.6
                    },
                    "449.l.607868.t.9": {
                        "teamName": "Kmetted to deep balls",
                        "total": 24.2
                    },
                    "449.l.607868.t.8": {
                        "teamName": "Probably Trash 🥈",
                        "total": 48
                    }
                }
            },
            "variants": [
                {
                    "winners_weekly": {
                        "1": [
                            {
                                "teamName": "Mel🥇",
                                "total": 74.26,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "2": [
                            {
                                "teamName": "Probably Trash 🥈",
                                "total": 58.1,
                                "id": "449.l.607868.t.8"
                            }
                        ],
                        "3": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 78.98,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "4": [
                            {
                                "teamName": "Off constantly",
                                "total": 76.67999999999999,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "5": [
                            {
                                "teamName": "BLaZiNgGLoRy 🥈",
                                "total": 64.64,
                                "id": "449.l.607868.t.2"
                            }
                        ],
                        "6": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 53.9,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "7": [
                            {
                                "teamName": "THE HAMMER 🥇🥈🥇",
                                "total": 61.400000000000006,
                                "id": "449.l.607868.t.10"
                            }
                        ],
                        "8": [
                            {
                                "teamName": "Off constantly",
                                "total": 95.16000000000001,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "9": [
                            {
                                "teamName": "Big Chunk",
                                "total": 61.38,
                                "id": "449.l.607868.t.3"
                            }
                        ],
                        "10": [
                            {
                                "teamName": "Dirty Dan",
                                "total": 55.82,
                                "id": "449.l.607868.t.5"
                            }
                        ],
                        "11": [
                            {
                                "teamName": "Off constantly",
                                "total": 76.58000000000001,
                                "id": "449.l.607868.t.11"
                            }
                        ],
                        "12": [
                            {
                                "teamName": "Mel🥇",
                                "total": 72.92,
                                "id": "449.l.607868.t.7"
                            }
                        ],
                        "13": [
                            {
                                "teamName": "The Dicktator 🥇🥉🚽",
                                "total": 94.85999999999999,
                                "id": "449.l.607868.t.1"
                            }
                        ],
                        "14": [
                            {
                                "teamName": "THE HAMMER 🥇🥈🥇",
                                "total": 63.419999999999995,
                                "id": "449.l.607868.t.10"
                            }
                        ],
                        "15": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 89.74,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "16": [
                            {
                                "teamName": "Da Mayor of TD City",
                                "total": 68.12,
                                "id": "449.l.607868.t.4"
                            }
                        ],
                        "17": [
                            {
                                "teamName": "Captain Amoeba 🥇🥇🏆",
                                "total": 72.4,
                                "id": "449.l.607868.t.6"
                            }
                        ]
                    },
                    "winners_season": [
                        {
                            "teamName": "Off constantly",
                            "total": 914.1200000000002,
                            "id": "449.l.607868.t.11"
                        }
                    ],
                    "copy": {
                        "icon": "🪑",
                        "season": "The team that benched the most potential points all season long.",
                        "weekly": "{team_name} left the most points sitting on the bench this week."
                    },
                    "title": "Bench Blunder",
                    "key": "most_bench_points_top",
                    "award_id": "total-bench-points-award",
                    "direction": "top"
                }
            ],
            "SK": "AWARD#TYPE#ACCUMULATIVE#ID#total-bench-points-award"
        }
    ],
    "league": {
        "PK": "USER#daniel.reguero@hotmail.com#PROVIDER#yahoo#PROVIDERID#UKVCCRP2UGKQBR3RPZAMQZQQ3K",
        "created_at": "2024-11-19T17:21:22.804Z",
        "current_week": 17,
        "end_week": 17,
        "entity_type": "league",
        "is_finished": false,
        "league_id": 607868,
        "league_key": "449.l.607868",
        "league_type": "private",
        "logo_url": null,
        "name": "Daniel Loses at the End",
        "provider": "yahoo",
        "season": "2024",
        "share_id": "bLH9t1",
        "SK": "LEAGUE#yahoo#ID#449.l.607868"
    }
};

const Demo = () => {
    const [awards, setAwards] = useState(demoV2.awards);
    const [league, setLeague] = useState(demoV2.league);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [tab, setTab] = useState('insights');                 // "insights" | "breakdown"
    const [viewMode, setViewMode] = useState('cumulative');     // "cumulative" | "weekly"
    const [selectedWeek, setSelectedWeek] = useState(demoV2.league.current_week);
    const [allWeeks, setAllWeeks] = useState(
        Object.keys(demoV2.awards[0]?.award_data_weekly)
            .map(Number)
            .sort((a, b) => a - b)
    );
    const [expanded, setExpanded] = useState(new Set());
    const navigate = useNavigate();

    return (
        <Box className="leaderboard-container">
            {league && <Typography variant="h4" gutterBottom textAlign="center">2024 Yahoo Fantasy League Demo</Typography>}
            {league && <Typography variant="h6" gutterBottom textAlign="center">
                Here's a preview of how awards look using data from my 2024 Yahoo league. The demo only show cases 6 awards but there are a total of 15 awards and more to come! <br /> <br /> You can view awards accumulative over the season or by week.</Typography>}

            {awards?.length > 0 && (
                <Box display="flex" flexDirection="column" gap={2} sx={{ mt: '1rem', mb: '1rem' }}>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => v && setTab(v)}>
                            <ToggleButton value="insights">Insights</ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)}>
                            <ToggleButton value="cumulative">Cumulative</ToggleButton>
                            <ToggleButton value="weekly">Weekly</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        {viewMode === 'weekly' && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        const idx = allWeeks.indexOf(selectedWeek);
                                        if (idx > 0) setSelectedWeek(allWeeks[idx - 1]);
                                    }}
                                    disabled={allWeeks.indexOf(selectedWeek) === 0}
                                >
                                    {'<'}
                                </Button>

                                <Select
                                    value={selectedWeek}
                                    onChange={e => setSelectedWeek(e.target.value)}
                                    sx={{ minWidth: 120 }}
                                >
                                    {allWeeks.map(w => <MenuItem key={w} value={w}>Week {w}</MenuItem>)}
                                </Select>

                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        const idx = allWeeks.indexOf(selectedWeek);
                                        if (idx < allWeeks.length - 1) setSelectedWeek(allWeeks[idx + 1]);
                                    }}
                                    disabled={allWeeks.indexOf(selectedWeek) === allWeeks.length - 1}
                                >
                                    {'>'}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            {awards?.length > 0 && (<Box className="home-insight-grid">
                {awards.flatMap((award, index) =>
                    (award.variants || []).map(variant => {
                        const weeks = Object.keys(award?.award_data_weekly || {});
                        const latestWeek = weeks[weeks.length - 1];
                        const wk = viewMode === 'weekly' ? (selectedWeek || latestWeek) : latestWeek;
                        const weeklyWinner = wk && variant.winners_weekly?.[wk]?.[0];
                        if (viewMode === "weekly" && !weeklyWinner) {
                            // weekly view but we don't have anything for this weekly award.
                            return;
                        }
                        const seasonWinner = variant.winners_season?.[0];
                        const showWeekly = viewMode === 'weekly' && weeklyWinner;
                        const winner = showWeekly ? weeklyWinner : seasonWinner;
                        const text = (showWeekly ? variant.copy.weekly : variant.copy.season)
                            .replace('{team_name}', winner?.teamName || '—');

                        const iconNode = (() => {
                            const ic = variant.copy?.icon;
                            if (!ic) return '⭐';
                            if (typeof ic === 'string' && /^https?:\/\//i.test(ic)) {
                                return <img src={ic} alt="" className="home-insight-icon-img" />;
                            } else if (typeof ic === "string") {
                                return ic;
                            }
                        })();

                        return (
                            <Box key={`${award.id}-${variant.key}`} className="home-insight-card">
                                <Box className="home-insight-icon">{iconNode}</Box>
                                <Typography className="home-insight-title">{variant.title.toUpperCase()}</Typography>
                                <Typography className="home-insight-text">{text}</Typography>
                                <Box className="home-insight-footer">
                                    <Typography className="home-insight-winner" title={winner?.teamName} sx={{ fontWeight: 700 }}>{winner?.teamName || '—'}</Typography>
                                    {winner?.total != null && (
                                        <Typography className="home-insight-value">{Number.isInteger(winner.total) ? winner.total : winner.total.toFixed(2)}</Typography>
                                    )}
                                </Box>
                            </Box>
                        );
                    })
                )}
            </Box>)}

            <Box mt={4}>
                <Typography variant="h6" textAlign="center" gutterBottom>
                    And there's more awards! Such as <b>Most Interceptions</b>, positional scoring leaders,
                    and deeper breakdowns showing week-to-week trends, all team rankings and even player contributions.
                </Typography>

                <br />
                {/* Render breakdown for one award */}
                <Grid container justifyContent="center" alignItems="flex-start" spacing={3}>
                    {awards.slice(0, 1).map((award, index) => {

                        let sortedTeams = Object.values(award.award_data).sort((a, b) => b.total - a.total);
                        const maxPoints = sortedTeams.length ? Math.max(...sortedTeams.map(i => i.total)) : 0;
                        const isExpanded = expanded.has(award.SK);

                        return (
                            <Grid xs={12} key={award.SK || index}>
                                <Box className="award-section" p={2} borderRadius={2} boxShadow={2} maxWidth={560}>
                                    <Typography variant="h5" gutterBottom>{award.name}</Typography>
                                    <Typography variant="body2" gutterBottom color='grey'>{award.description}</Typography>

                                    {!!sortedTeams.length && (
                                        <Box mt={2}>
                                            {sortedTeams.map((item, idx) => (
                                                <Box key={idx} display="flex" alignItems="center" mb={1}>
                                                    <Typography className="team-name" width="30%" noWrap>{item.teamName}</Typography>
                                                    <Box flexGrow={1} mx={1}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={(item.total > 0 && maxPoints > 0) ? (item.total / maxPoints) * 100 : 1}
                                                            sx={{
                                                                height: 10, borderRadius: 5,
                                                                '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main' },
                                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography className="points">{Number.isInteger(item.total) ? item.total : item.total.toFixed(2)}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}

                                    {award?.award_data_weekly && (
                                        <Box mt={2} display="flex" justifyContent="flex-end">
                                            <Button size="small" variant="text" onClick={() => {
                                                setExpanded(prev => {
                                                    const n = new Set(prev);
                                                    n.has(award.SK) ? n.delete(award.SK) : n.add(award.SK);
                                                    return n;
                                                });
                                            }}>
                                                {isExpanded ? 'Hide Breakdown' : 'Show Breakdown'}
                                            </Button>
                                        </Box>
                                    )}

                                    {isExpanded && (
                                        <Box mt={2}>
                                            <Box mb={3}>
                                                <Typography variant="subtitle1" gutterBottom fontWeight="bold">League Cumulative Points</Typography>
                                                <Typography variant="body2" gutterBottom color="text.secondary">
                                                    Tracks each team's cumulative points week by week across the season.
                                                </Typography>
                                                <LeagueCumulativeChart award={award} />
                                            </Box>
                                            {award?.player_data && (
                                                <Box>
                                                    <Typography variant="subtitle1" gutterBottom fontWeight="bold">Player Contribution Breakdown</Typography>
                                                    <Typography variant="body2" gutterBottom color="text.secondary">
                                                        Select a team to see how individual players contributed to their total points over time.
                                                    </Typography>
                                                    <PlayerStatsChart award={award} />
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
};

export default Demo;
