import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Dashboard = () => {
  // Signal light state for 4 directions
  const [signalStates, setSignalStates] = useState({
    North: { color: "RED" as "RED" | "YELLOW" | "GREEN", timer: 45 },
    South: { color: "GREEN" as "RED" | "YELLOW" | "GREEN", timer: 25 },
    East: { color: "RED" as "RED" | "YELLOW" | "GREEN", timer: 20 },
    West: { color: "YELLOW" as "RED" | "YELLOW" | "GREEN", timer: 3 }
  });

  // Vehicle counters for 4 directions
  const [vehicleCounts, setVehicleCounts] = useState({
    North: 12,
    South: 8,
    East: 15,
    West: 6
  });

  // Queue length data for progress bars (percentage values)
  const queueData = [
    { direction: "North", queueLength: 75, color: "hsl(var(--primary))" },
    { direction: "South", queueLength: 45, color: "hsl(var(--primary-glow))" },
    { direction: "East", queueLength: 90, color: "hsl(var(--accent))" },
    { direction: "West", queueLength: 30, color: "hsl(var(--secondary))" }
  ];

  // Queue trends data for area chart
  const queueTrends = [
    { time: "09:00", North: 20, South: 15, East: 25, West: 10 },
    { time: "09:30", North: 35, South: 22, East: 40, West: 18 },
    { time: "10:00", North: 45, South: 30, East: 55, West: 25 },
    { time: "10:30", North: 38, South: 28, East: 48, West: 22 },
    { time: "11:00", North: 42, South: 32, East: 52, West: 28 },
    { time: "11:30", North: 48, South: 35, East: 58, West: 30 }
  ];

  const chartConfig = {
    North: {
      label: "North Queue",
      color: "hsl(var(--primary))",
    },
    South: {
      label: "South Queue", 
      color: "hsl(var(--primary-glow))",
    },
    East: {
      label: "East Queue",
      color: "hsl(var(--accent))",
    },
    West: {
      label: "West Queue",
      color: "hsl(var(--secondary))",
    },
  };

  // Timer countdown effect for all directions
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStates(prev => {
        const newStates = { ...prev };
        Object.keys(newStates).forEach(direction => {
          const state = newStates[direction as keyof typeof newStates];
          if (state.timer > 0) {
            state.timer -= 1;
          } else {
            // Cycle through signals
            const nextSignal = state.color === "RED" ? "GREEN" : 
                             state.color === "GREEN" ? "YELLOW" : "RED";
            const nextTimer = nextSignal === "RED" ? 45 : 
                            nextSignal === "GREEN" ? 30 : 5;
            state.color = nextSignal;
            state.timer = nextTimer;
          }
        });
        return newStates;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate vehicle count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleCounts(prev => ({
        North: Math.max(0, prev.North + Math.floor(Math.random() * 5) - 2),
        South: Math.max(0, prev.South + Math.floor(Math.random() * 5) - 2),
        East: Math.max(0, prev.East + Math.floor(Math.random() * 5) - 2),
        West: Math.max(0, prev.West + Math.floor(Math.random() * 5) - 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const SignalLight = ({ direction }: { direction: keyof typeof signalStates }) => {
    const state = signalStates[direction];
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="bg-muted rounded-lg p-3 flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center"
               style={{ backgroundColor: state.color === "RED" ? "#ef4444" : "transparent" }}>
            {state.color === "RED" && <div className="w-6 h-6 rounded-full bg-red-500"></div>}
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center"
               style={{ backgroundColor: state.color === "YELLOW" ? "#eab308" : "transparent" }}>
            {state.color === "YELLOW" && <div className="w-6 h-6 rounded-full bg-yellow-500"></div>}
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center"
               style={{ backgroundColor: state.color === "GREEN" ? "#22c55e" : "transparent" }}>
            {state.color === "GREEN" && <div className="w-6 h-6 rounded-full bg-green-500"></div>}
          </div>
        </div>
        <div className="text-center">
          <div className="font-body text-xs text-muted-foreground">{direction}</div>
          <div className="font-hero text-lg font-bold text-foreground">{state.timer}s</div>
          <div className="font-body text-xs text-muted-foreground">{state.color}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-hero text-5xl mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Traffic Control Dashboard
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-7xl">
            The "Finally, A Car!" Moment
We've all seen a traffic light complete its full, leisurely cycle for just one waiting car. Our system ends that silliness.

Its Real-Time Perception layer is always watching. So if you're the only car at an intersection, the light doesn't make you wait for its coffee break—it just gives you the green light. 
            </p>
          </motion.div>

          {/* Top Section: Traffic Signals & Backend Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 mb-12"
          >
            {/* 4-Direction Traffic Signals */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Traffic Signal Status (4 Directions)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(signalStates).map((direction) => (
                    <div key={direction} className="flex justify-center">
                      <SignalLight direction={direction as keyof typeof signalStates} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backend Video Showcase */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Backend System Live Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="font-body text-sm text-muted-foreground">Live Backend Feed</div>
                    <div className="font-body text-xs text-muted-foreground mt-1">Real-time traffic processing</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vehicle Counters Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Vehicle Counters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(vehicleCounts).map(([direction, count]) => (
                    <div key={direction} className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="font-body text-sm text-muted-foreground mb-1">{direction}</div>
                      <div className="font-hero text-2xl font-bold text-foreground">{count}</div>
                      <div className="font-body text-xs text-muted-foreground">vehicles</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Queue Length Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Queue Length Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {queueData.map((data) => (
                    <div key={data.direction} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-body text-sm font-medium text-foreground">{data.direction}</div>
                        <div className="font-hero text-lg font-bold text-foreground">{data.queueLength}%</div>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={data.queueLength} 
                          className="h-3 bg-muted/50" 
                          indicatorColor={data.color}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Queue Trends Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-body text-xl font-semibold text-foreground">
                  Queue Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <AreaChart data={queueTrends}>
                    <defs>
                      <linearGradient id="fillNorth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillSouth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillEast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillWest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="North" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#fillNorth)" />
                    <Area type="monotone" dataKey="South" stroke="hsl(var(--primary-glow))" fillOpacity={1} fill="url(#fillSouth)" />
                    <Area type="monotone" dataKey="East" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#fillEast)" />
                    <Area type="monotone" dataKey="West" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#fillWest)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;