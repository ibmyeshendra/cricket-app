import React, { useState, useEffect } from 'react';
import {Radio, TrendingUp, Clock, Zap, Target} from 'lucide-react';

export default function CricketScoreDisplay() {
    const [matchData, setMatchData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Load match data from storage (will be updated by admin panel)
    useEffect(() => {
        loadMatchData();
        const interval = setInterval(loadMatchData, 2000); // Check for updates every 2 seconds
        return () => clearInterval(interval);
    }, []);

    const loadMatchData = () => {
        // This will load data saved by the admin panel
        const stored = localStorage.getItem('cricketMatchData');
        if (stored) {
            setMatchData(JSON.parse(stored));
        } else {
            // Demo data for preview
            setMatchData({
                matchTitle: "T20 International Match",
                venue: "Wankhede Stadium, Mumbai",
                matchType: "2nd Innings",
                status: "LIVE",

                battingTeam: {
                    name: "India",
                    shortName: "IND",
                    score: 178,
                    wickets: 4,
                    overs: 17.3,
                    color: "#0066cc"
                },

                bowlingTeam: {
                    name: "Australia",
                    shortName: "AUS",
                    score: 165,
                    wickets: 8,
                    overs: 20.0,
                    color: "#FFD700"
                },

                batsmen: [
                    {
                        name: "Virat Kohli",
                        runs: 67,
                        balls: 45,
                        fours: 7,
                        sixes: 2,
                        strikeRate: 148.89,
                        onStrike: true
                    },
                    {
                        name: "Shreyas Iyer",
                        runs: 23,
                        balls: 16,
                        fours: 2,
                        sixes: 1,
                        strikeRate: 143.75,
                        onStrike: false
                    }
                ],

                bowler: {
                    name: "Pat Cummins",
                    overs: 3.3,
                    maidens: 0,
                    runs: 28,
                    wickets: 1,
                    economy: 8.00
                },

                recentBalls: ["1", "4", ".", "2", "6", "W"],

                currentRunRate: 10.23,
                requiredRunRate: 8.67,
                target: 166,
                needRuns: 13,
                needBalls: 15,

                partnership: {
                    runs: 56,
                    balls: 34
                },

                lastWicket: "R. Sharma c Smith b Starc 45 (32)"
            });
        }
    };

    if (!matchData) {
        return (
            <div className="h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-2xl">Loading Match Data...</div>
            </div>
        );
    }

    const { battingTeam, bowlingTeam, batsmen, bowler, recentBalls } = matchData;

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-4 shadow-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Radio className="w-6 h-6 text-red-400 animate-pulse" />
                            <span className="text-red-400 font-bold text-lg">{matchData.status}</span>
                            <span className="text-white/80 text-sm">• {matchData.matchType}</span>
                        </div>
                        <h1 className="text-3xl font-bold">{matchData.matchTitle}</h1>
                        <p className="text-white/70 mt-1">{matchData.venue}</p>
                    </div>
                    <div className="text-right">
                        <Clock className="w-5 h-5 inline mr-2 text-white/70" />
                        <span className="text-white/90 font-mono text-lg">
              {currentTime.toLocaleTimeString()}
            </span>
                    </div>
                </div>
            </div>

            {/* Main Score Section */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Team 1 */}
                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold">{battingTeam.name}</h2>
                        <span className="text-sm bg-green-600 px-3 py-1 rounded-full">Batting</span>
                    </div>
                    <div className="text-6xl font-bold mb-2">
                        {battingTeam.score}/{battingTeam.wickets}
                    </div>
                    <div className="text-2xl text-gray-400">
                        ({battingTeam.overs} overs)
                    </div>
                    <div className="mt-4 text-gray-400">
                        CRR: <span className="text-white font-bold">{matchData.currentRunRate}</span>
                    </div>
                </div>

                {/* Team 2 */}
                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold">{bowlingTeam.name}</h2>
                        <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">Bowling</span>
                    </div>
                    <div className="text-6xl font-bold mb-2">
                        {bowlingTeam.score}/{bowlingTeam.wickets}
                    </div>
                    <div className="text-2xl text-gray-400">
                        ({bowlingTeam.overs} overs)
                    </div>
                </div>
            </div>

            {/* Target Info */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-5 mb-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Target className="w-8 h-8" />
                        <div>
                            <div className="text-sm text-white/80">Target: {matchData.target}</div>
                            <div className="text-2xl font-bold">
                                Need {matchData.needRuns} runs from {matchData.needBalls} balls
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-white/80">Required Run Rate</div>
                        <div className="text-3xl font-bold">{matchData.requiredRunRate}</div>
                    </div>
                </div>
            </div>

            {/* Batsmen Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {batsmen.map((batsman, idx) => (
                    <div
                        key={idx}
                        className={`bg-gray-800/50 backdrop-blur rounded-xl p-5 border-2 ${
                            batsman.onStrike ? 'border-green-500' : 'border-gray-700'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold">{batsman.name}</h3>
                            {batsman.onStrike && (
                                <span className="text-xs bg-green-600 px-2 py-1 rounded-full">
                  On Strike
                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-5 gap-3 text-center">
                            <div>
                                <div className="text-3xl font-bold text-blue-400">{batsman.runs}</div>
                                <div className="text-xs text-gray-400">Runs</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{batsman.balls}</div>
                                <div className="text-xs text-gray-400">Balls</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{batsman.fours}</div>
                                <div className="text-xs text-gray-400">4s</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{batsman.sixes}</div>
                                <div className="text-xs text-gray-400">6s</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-400">{batsman.strikeRate}</div>
                                <div className="text-xs text-gray-400">SR</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bowler & Recent Balls */}
            <div className="grid grid-cols-3 gap-4">
                {/* Current Bowler */}
                <div className="col-span-2 bg-gray-800/50 backdrop-blur rounded-xl p-5 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">Current Bowler</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">{bowler.name}</div>
                        <div className="grid grid-cols-5 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold">{bowler.overs}</div>
                                <div className="text-xs text-gray-400">Overs</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{bowler.maidens}</div>
                                <div className="text-xs text-gray-400">M</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{bowler.runs}</div>
                                <div className="text-xs text-gray-400">Runs</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-400">{bowler.wickets}</div>
                                <div className="text-xs text-gray-400">Wkts</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-400">{bowler.economy}</div>
                                <div className="text-xs text-gray-400">Econ</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Balls */}
                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-5 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">This Over</h3>
                    <div className="flex gap-2 justify-center items-center flex-wrap">
                        {recentBalls.map((ball, idx) => (
                            <div
                                key={idx}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                                    ball === '6' ? 'bg-purple-600' :
                                        ball === '4' ? 'bg-blue-600' :
                                            ball === 'W' ? 'bg-red-600' :
                                                ball === '.' ? 'bg-gray-600' :
                                                    'bg-green-600'
                                }`}
                            >
                                {ball}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400">Partnership</div>
                    <div className="text-2xl font-bold">
                        {matchData.partnership.runs} runs ({matchData.partnership.balls} balls)
                    </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400">Last Wicket</div>
                    <div className="text-lg font-semibold">{matchData.lastWicket}</div>
                </div>
            </div>
        </div>
    );
}