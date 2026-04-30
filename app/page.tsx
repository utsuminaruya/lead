"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { dict, Locale } from "@/lib/locale";

type Job = { id: string; title: string; location: string; salary: string; requirement: string };
type Task = { id: string; title: string; due_date: string; status: string };

export default function Home() {
  const [lang, setLang] = useState<Locale>("ja");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [region, setRegion] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");
  const t = useMemo(() => dict[lang], [lang]);

  const loadTasks = async () => setTasks(await (await fetch("/api/tasks")).json());
  const loadJobs = async () => setJobs(await (await fetch("/api/jobs")).json());

  const filteredJobs = jobs.filter((j) =>
    (!region || j.location.toLowerCase().includes(region.toLowerCase())) &&
    (!role || j.title.toLowerCase().includes(role.toLowerCase())) &&
    (!level || j.requirement.toLowerCase().includes(level.toLowerCase()))
  );

  return (
    <main className="mx-auto max-w-4xl p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.appTitle}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setLang("ja")}>JA</Button>
          <Button variant="outline" onClick={() => setLang("vi")}>VI</Button>
          <Button variant="outline" onClick={() => setLang("en")}>EN</Button>
        </div>
      </div>
      <p className="text-slate-600">{t.tagline}</p>

      <Card><CardHeader><CardTitle>{t.login}</CardTitle></CardHeader><CardContent><div className="flex gap-3"><Button>{t.login}</Button><Button variant="outline">{t.googleLogin}</Button></div></CardContent></Card>

      <Card><CardHeader><CardTitle>{t.dashboard}</CardTitle></CardHeader><CardContent><div><Button onClick={loadTasks}>{t.todayTasks}</Button><ul className="mt-3 space-y-2">{tasks.map((task) => <li key={task.id}>• {task.title} ({task.status}) - {task.due_date}</li>)}</ul></div></CardContent></Card>

      <Card><CardHeader><CardTitle>{t.chat}</CardTitle></CardHeader><CardContent><div className="space-y-2"><Textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={t.aiPlaceholder} /><Button onClick={() => setChatReply(`${chatInput}\n→ 次の行動: まず必要書類を確認し、候補を1件選んで応募してください。`)}>{t.send}</Button>{chatReply && <div className="rounded bg-slate-100 p-3 text-sm whitespace-pre-wrap">{chatReply}</div>}</div></CardContent></Card>

      <Card><CardHeader><CardTitle>{t.jobs}</CardTitle></CardHeader><CardContent><div className="space-y-3"><div className="grid md:grid-cols-3 gap-2"><Input placeholder={t.region} value={region} onChange={(e) => setRegion(e.target.value)} /><Input placeholder={t.role} value={role} onChange={(e) => setRole(e.target.value)} /><Input placeholder={t.level} value={level} onChange={(e) => setLevel(e.target.value)} /></div><Button onClick={loadJobs}>GET /jobs</Button>{filteredJobs.map((job) => <div key={job.id} className="border rounded p-3 flex justify-between items-center"><div><p className="font-medium">{job.title}</p><p className="text-sm text-slate-600">{job.location} / {job.salary} / {job.requirement}</p></div><Button onClick={() => fetch('/api/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jobId:job.id,userId:'demo-user'})})}>{t.apply}</Button></div>)}</div></CardContent></Card>

      <Card><CardHeader><CardTitle>{t.life}</CardTitle></CardHeader><CardContent><div className="grid md:grid-cols-3 gap-3 text-sm"><a className="border rounded p-3" href="#">{t.hospital}</a><a className="border rounded p-3" href="#">{t.housing}</a><a className="border rounded p-3" href="#">{t.visa}</a></div></CardContent></Card>

      <Card><CardHeader><CardTitle>{t.jpStudy}</CardTitle></CardHeader><CardContent><div><p>{t.studyLinks}</p><p className="text-sm text-slate-500">{t.quizSoon}</p></div></CardContent></Card>
    </main>
  );
}
