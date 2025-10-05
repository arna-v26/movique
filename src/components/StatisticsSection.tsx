import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TriangleLoader } from "./TriangleLoader";

const languageData = [
  { name: "English", value: 450 },
  { name: "Hindi", value: 230 },
  { name: "Spanish", value: 190 },
  { name: "Korean", value: 150 },
  { name: "French", value: 120 },
  { name: "German", value: 100 },
];

const genreData = [
  { name: "Action", value: 30 },
  { name: "Comedy", value: 20 },
  { name: "Drama", value: 25 },
  { name: "Sci-Fi", value: 10 },
  { name: "Horror", value: 5 },
  { name: "Romance", value: 10 },
];

const accessibilityData = [
  { name: "Subtitles", value: 90 },
  { name: "Dubbing", value: 75 },
  { name: "Audio Description", value: 60 },
  { name: "Sign Language", value: 40 },
];

const platformData = [
  { name: "Web", value: 100 },
  { name: "Mobile", value: 95 },
  { name: "Smart TV", value: 88 },
  { name: "Game Console", value: 70 },
];

const COLORS = ["hsl(199, 89%, 48%)", "hsl(217, 91%, 60%)", "hsl(186, 100%, 29%)", "hsl(25, 95%, 53%)", "hsl(340, 100%, 50%)", "hsl(150, 70%, 50%)"];

export const StatisticsSection = () => {
  const [dataType, setDataType] = useState<"language" | "genre" | "accessibility" | "platform">("language");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChartTypeChange = (type: "bar" | "line" | "pie") => {
    setIsLoading(true);
    setTimeout(() => { setChartType(type); setIsLoading(false); }, 3500);
  };

  const getData = () => {
    switch (dataType) {
      case "language": return languageData;
      case "genre": return genreData;
      case "accessibility": return accessibilityData;
      case "platform": return platformData;
      default: return languageData;
    }
  };

  const downloadData = () => {
    const csv = [["Name", "Value"], ...getData().map(i => [i.name, i.value])].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${dataType}-statistics.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) return <TriangleLoader />;

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-10 text-9xl opacity-5 select-none">🎬</div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`mb-16 grid grid-cols-2 md:grid-cols-4 gap-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {[
            { value: "1,200+", label: "Total Titles" },
            { value: "15+", label: "Languages" },
            { value: "12", label: "Genres" },
            { value: "99.9%", label: "Uptime" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-xl" style={{ background: "var(--gradient-card)" }}>
              <div className="text-4xl md:text-5xl font-heading font-black text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 className={`mb-12 text-center font-heading text-5xl font-black md:text-6xl ${isVisible ? "animate-pop-in" : "opacity-0"}`}
          style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Platform Analytics
        </h2>

        <div className={`mb-8 flex flex-wrap items-center justify-between gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-wrap gap-4">
            <Select value={dataType} onValueChange={(value: any) => setDataType(value)}>
              <SelectTrigger className="w-48 bg-card border-primary/30"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="language">Count by Language</SelectItem>
                <SelectItem value="genre">Genre Distribution</SelectItem>
                <SelectItem value="accessibility">Accessibility</SelectItem>
                <SelectItem value="platform">Platform Support</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={() => handleChartTypeChange("bar")} variant={chartType === "bar" ? "default" : "outline"}>Bar</Button>
              <Button onClick={() => handleChartTypeChange("line")} variant={chartType === "line" ? "default" : "outline"}>Line</Button>
              {(dataType === "genre" || dataType === "accessibility") && <Button onClick={() => handleChartTypeChange("pie")} variant={chartType === "pie" ? "default" : "outline"}>Pie</Button>}
            </div>
          </div>
          <Button onClick={downloadData} className="bg-secondary hover:bg-secondary/90"><Download className="mr-2 h-4 w-4" />Download</Button>
        </div>

        <div className={`rounded-2xl p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)", animationDelay: "0.4s" }}>
          <ResponsiveContainer width="100%" height={400}>
            {chartType === "bar" ? (
              <BarChart data={getData()}><CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 17%)" /><XAxis dataKey="name" stroke="hsl(210, 40%, 98%)" /><YAxis stroke="hsl(210, 40%, 98%)" /><Tooltip contentStyle={{ backgroundColor: "hsl(217, 33%, 17%)", border: "1px solid hsl(199, 89%, 48%)", borderRadius: "8px" }} /><Legend /><Bar dataKey="value" fill="hsl(199, 89%, 48%)" radius={[8, 8, 0, 0]} /></BarChart>
            ) : chartType === "line" ? (
              <LineChart data={getData()}><CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 17%)" /><XAxis dataKey="name" stroke="hsl(210, 40%, 98%)" /><YAxis stroke="hsl(210, 40%, 98%)" /><Tooltip contentStyle={{ backgroundColor: "hsl(217, 33%, 17%)", border: "1px solid hsl(199, 89%, 48%)", borderRadius: "8px" }} /><Legend /><Line type="monotone" dataKey="value" stroke="hsl(217, 91%, 60%)" strokeWidth={3} dot={{ fill: "hsl(217, 91%, 60%)", r: 6 }} /></LineChart>
            ) : (
              <PieChart><Pie data={getData()} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={150} dataKey="value">{getData().map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
