
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { dict, Locale } from "@/lib/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const LINE_URL = "https://lin.ee/xUocVyI";
const MESSENGER_URL = "https://www.facebook.com/MediflowKK";

type Form = {
  job: string | null;
  visa: string | null;
  pref: string | null;
  jlpt: string | null;
  exp: string | null;
  housing: string | null;
  name: string;
  contact: string;
  email?: string;
};

export default function Home() {
  const [lang, setLang] = useState<Locale>("ja");
  const t = useMemo(() => dict[lang], [lang]);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    job: null, visa: null, pref: null, jlpt: null, exp: null, housing: null,
    name: "", contact: "", email: ""
  });

  const progress = Math.round((step / 7) * 100);
  const canNext = () => {
    switch(step){
      case 1: return !!form.job;
      case 2: return !!form.visa;
      case 3: return !!form.pref;
      case 4: return !!form.jlpt;
      case 5: return !!form.exp;
      case 6: return !!form.housing;
      case 7: return !!form.name && !!form.contact;
      default: return true;
    }
  };

  const start = () => setStep(1);
  const next = () => setStep(s => Math.min(7, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  // select + auto-advance
  function choose<K extends keyof Form>(key: K, value: Form[K]) {
    setForm(f => ({ ...f, [key]: value }));
    next();
  }

  const submit = async () => {
    setLoading(true);
    try {
      const payload = { ...form, lang, ua: navigator.userAgent, ts: new Date().toISOString() };
      const res = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error(await res.text());
      setSent(true); setStep(0);
    } catch(e){
      alert("送信に失敗しました。もう一度お試しください。");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={36} height={36} />
            <span className="font-semibold text-slate-800">Mediflow</span>
          </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setLang("ja")}>{dict.ja.lang_ja}</Button>
              <Button variant="outline" onClick={() => setLang("vi")}>{dict.vi.lang_vi}</Button>
            </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-brand-500 to-brand-800">
            {t.app_title}
          </h1>
          <p className="text-slate-600 mt-2">{t.tagline}</p>
        </div>

        {!step && !sent && (
          <div className="grid items-center gap-6">
            <Card>
              <CardHeader><CardTitle>{t.app_title}</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• 介護職／看護助手／その他 だけを明確に選択</li>
                  <li>• 7ステップ（約30秒）で完了</li>
                  <li>• 結果はLINEまたはMessengerで即連絡</li>
                </ul>
                <Button onClick={start} className="mt-4 w-full">{t.start}</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step > 0 && !sent && (
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-slate-500">Step {step} / 7</div>
                <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500" style={{ width: `${progress}%`}} />
                </div>
              </div>

              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.step1_title}</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Button variant={form.job==='caregiver'?'primary':'outline'} onClick={() => choose('job','caregiver')}>{t.caregiver}</Button>
                    <Button variant={form.job==='nurse_aide'?'primary':'outline'} onClick={() => choose('job','nurse_aide')}>{t.nurse_aide}</Button>
                    <Button variant={form.job==='other'?'primary':'outline'} onClick={() => choose('job','other')}>{t.other}</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.step2_title}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button variant={form.visa==='student'?'primary':'outline'} onClick={() => choose('visa','student')}>{t.visa_student}</Button>
                    <Button variant={form.visa==='specified'?'primary':'outline'} onClick={() => choose('visa','specified')}>{t.visa_specified}</Button>
                    <Button variant={form.visa==='technical'?'primary':'outline'} onClick={() => choose('visa','technical')}>{t.visa_technical}</Button>
                    <Button variant={form.visa==='other'?'primary':'outline'} onClick={() => choose('visa','other')}>{t.visa_other}</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.step3_title}</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Button variant={form.pref==='tokyo'?'primary':'outline'} onClick={() => choose('pref','tokyo')}>{t.tokyo}</Button>
                    <Button variant={form.pref==='kanagawa'?'primary':'outline'} onClick={() => choose('pref','kanagawa')}>{t.kanagawa}</Button>
                    <Button variant={form.pref==='chiba'?'primary':'outline'} onClick={() => choose('pref','chiba')}>{t.chiba}</Button>
                    <Button variant={form.pref==='saitama'?'primary':'outline'} onClick={() => choose('pref','saitama')}>{t.saitama}</Button>
                    <Button variant={form.pref==='anywhere'?'primary':'outline'} onClick={() => choose('pref','anywhere')}>{t.anywhere}</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.step4_title}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <Button variant={form.jlpt==='jlpt_n1'?'primary':'outline'} onClick={() => choose('jlpt','jlpt_n1')}>{t.jlpt_n1}</Button>
                    <Button variant={form.jlpt==='jlpt_n2'?'primary':'outline'} onClick={() => choose('jlpt','jlpt_n2')}>{t.jlpt_n2}</Button>
                    <Button variant={form.jlpt==='jlpt_n3'?'primary':'outline'} onClick={() => choose('jlpt','jlpt_n3')}>{t.jlpt_n3}</Button>
                    <Button variant={form.jlpt==='jlpt_n4'?'primary':'outline'} onClick={() => choose('jlpt','jlpt_n4')}>{t.jlpt_n4}</Button>
                    <Button variant={form.jlpt==='jlpt_n5'?'primary':'outline'} onClick={() => choose('jlpt','jlpt_n5')}>{t.jlpt_n5}</Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.step5_title}</h3>
                  <div className="grid sm:grid-cols-4 gap-2">
                    <Button variant={form.exp==='none'?'primary':'outline'} onClick={() => choose('exp','none')}>{t.exp_none}</Button>
                    <Button variant={form.exp==='lt1'?'primary':'outline'} onClick={() => choose('exp','lt1')}>{t.exp_lt1}</Button>
                    <Button variant={form.exp==='1to3'?'primary':'outline'} onClick={() => choose('exp','1to3')}>{t.exp_1to3}</Button>
                    <Button variant={form.exp==='gt3'?'primary':'outline'} onClick={() => choose('exp','gt3')}>{t.exp_gt3}</Button>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.step6_title}</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <Button variant={form.housing==='company'?'primary':'outline'} onClick={() => choose('housing','company')}>{t.housing_company}</Button>
                    <Button variant={form.housing==='self'?'primary':'outline'} onClick={() => choose('housing','self')}>{t.housing_self}</Button>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t.contact_title}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">{t.name}</label>
                      <Input placeholder="Nguyen Van A / 山田太郎"
                        value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                    </div>
                    <div>
                      <label className="label">{t.whatsapp}</label>
                      <Input placeholder="@yourID / +84..." value={form.contact}
                        onChange={e => setForm(f => ({...f, contact: e.target.value}))} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">{t.email}</label>
                      <Input type="email" placeholder="example@email.com"
                        value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{t.privacy_note}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <Button onClick={submit} disabled={loading || !form.name || !form.contact}>
                      {loading ? "送信中..." : t.submit}
                    </Button>
                    <a className="btn btn-outline" href={LINE_URL} target="_blank" rel="noreferrer">{t.add_line}</a>
                    <a className="btn btn-outline" href={MESSENGER_URL} target="_blank" rel="noreferrer">{t.add_messenger}</a>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={prev} disabled={step===1}>戻る</Button>
                <div className="flex items-center gap-2">
                  {step < 6 && (<Button onClick={next} disabled={!canNext()}>次へ</Button>)}
                  {step === 6 && (<Button onClick={next} disabled={!canNext()}>次へ（連絡先）</Button>)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 0 && !sent && (
          <div className="mt-8">
            <Card>
              <CardHeader><CardTitle>{dict[lang].contact_title}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">{dict[lang].name}</label>
                    <Input placeholder="Nguyen Van A / 山田太郎"
                      value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                  </div>
                  <div>
                    <label className="label">{dict[lang].whatsapp}</label>
                    <Input placeholder="@yourID / +84..." value={form.contact}
                      onChange={e => setForm(f => ({...f, contact: e.target.value}))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">{dict[lang].email}</label>
                    <Input type="email" placeholder="example@email.com"
                      value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{dict[lang].privacy_note}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button onClick={submit} disabled={loading || !form.name || !form.contact}>
                    {loading ? "送信中..." : dict[lang].submit}
                  </Button>
                  <a className="btn btn-outline" href={LINE_URL} target="_blank" rel="noreferrer">{dict[lang].add_line}</a>
                  <a className="btn btn-outline" href={MESSENGER_URL} target="_blank" rel="noreferrer">{dict[lang].add_messenger}</a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {sent && (
          <Card className="mt-6 text-center">
            <CardHeader><CardTitle>{t.complete_title}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-slate-600">{t.complete_desc}</p>
              <div className="banner mt-3">{t.instant_msg}</div>

              <div className="flex justify-center gap-3 mt-4">
                <a className="btn btn-primary" href={LINE_URL} target="_blank" rel="noreferrer">{t.add_line}</a>
                <a className="btn btn-outline" href={MESSENGER_URL} target="_blank" rel="noreferrer">{t.add_messenger}</a>
              </div>

              <div className="mt-6">
                <Button variant="outline" onClick={() => setSent(false)}>{t.back_home}</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="py-10 text-center text-xs text-slate-500">
        <div>© {new Date().getFullYear()} Mediflow Inc.</div>
        <div className="mt-1">このページには「介護事業者向けボタン」や統計数字の表示はありません。</div>
      </footer>
    </div>
  );
}
