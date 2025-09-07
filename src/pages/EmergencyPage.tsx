import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Footer  from "@/components/Footer";

// Mock data for demonstration
const mockHistoryData = [
  { ts: 1725623730, delayed_vehicles: 18, total_vehicles: 35, time: "10:30" },
  { ts: 1725623760, delayed_vehicles: 25, total_vehicles: 39, time: "10:31" },
  { ts: 1725623790, delayed_vehicles: 30, total_vehicles: 41, time: "10:32" },
  { ts: 1725623820, delayed_vehicles: 35, total_vehicles: 44, time: "10:33" },
  { ts: 1725623850, delayed_vehicles: 28, total_vehicles: 42, time: "10:34" },
  { ts: 1725623880, delayed_vehicles: 22, total_vehicles: 38, time: "10:35" },
  { ts: 1725623910, delayed_vehicles: 32, total_vehicles: 46, time: "10:36" },
];

const chartConfig = {
  delayed_vehicles: {
    label: "Delayed Vehicles",
    color: "hsl(var(--destructive))",
  },
  total_vehicles: {
    label: "Total Vehicles", 
    color: "hsl(var(--primary))",
  },
};

const EmergencyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-hero text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Emergency Mode
            </h1>
            <p className="text-muted-foreground text-lg">
            When an Emergency is Actually an Emergency
            Emergency vehicles used to play a high-stakes game of "Red Light, Green Light," relying on sirens and luck.

            Our system gives them the VIP treatment. When an emergency is detected, we create a red carpet experience: all other lights turn red, and a dedicated green light instantly clears the path to save the day.
            </p>
          </motion.div>

          {/* Emergency Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  🚨 Emergency Override Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Priority Direction:</span> Eastbound
                  </div>
                  <div>
                    <span className="font-medium">Signal State:</span> GREEN
                  </div>
                  <div>
                    <span className="font-medium">Timer:</span> 0s
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Delayed Vehicles Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Delayed Vehicles Trend</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Shows how quickly congestion builds during emergency override
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockHistoryData}>
                        <XAxis 
                          dataKey="time" 
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="delayed_vehicles"
                          stroke="var(--color-delayed_vehicles)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-delayed_vehicles)", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Vehicles Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Total Vehicles Trend</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Indicates overall traffic pressure at the intersection
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockHistoryData}>
                        <XAxis 
                          dataKey="time" 
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="total_vehicles"
                          stroke="var(--color-total_vehicles)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-total_vehicles)", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Current Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Delayed Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">32</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vehicles waiting in non-priority directions
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Total Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">46</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total vehicles at intersection
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default EmergencyPage;