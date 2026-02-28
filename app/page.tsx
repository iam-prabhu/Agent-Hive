'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap, Shield, Sparkles, BarChart, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveBackground from '@/components/ui/interactive-background';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-blue-200">
      <InteractiveBackground />

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={35} height={35} />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
            Agent Hive
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-slate-600 font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#impact" className="hover:text-blue-600 transition-colors">Impact</a>
          <a href="#reviews" className="hover:text-blue-600 transition-colors">Reviews</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-5 shadow-lg shadow-blue-200 transition-all hover:scale-105">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-700 font-medium text-sm backdrop-blur-sm border border-blue-200">
            <Sparkles className="w-4 h-4" />
            <span>The future of no-code AI automation is here</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Empower <span className="text-blue-600">Ideas</span> with<br />
            Intelligent Agents.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500">
              No Code, Just Pure AI.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Design agents that understand, think, and take action for you. From chatbots to task automators — build smarter, faster, easier.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full px-8 py-6 h-auto shadow-xl shadow-blue-200 transition-all hover:scale-105 w-full sm:w-auto">
                Explore Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg rounded-full px-8 py-6 h-auto border-2 hover:bg-slate-100 transition-all bg-white/50 backdrop-blur-sm w-full sm:w-auto">
              Contact Support
            </Button>
          </div>
          <div className="pt-6 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> 50 Free Agents</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cancel anytime</span>
          </div>
        </motion.div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="relative z-10 py-24 bg-white/60 backdrop-blur-lg border-y border-slate-200/50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features, Zero Friction</h2>
            <p className="text-lg text-slate-600">Everything you need to orchestrate complex AI workflows without writing a single line of backend logic.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast Builder", desc: "Drag, drop, and connect nodes instantly with our beautifully fluid canvas editor." },
              { icon: Bot, title: "Autonomous Routing", desc: "Let AI dynamically decide the next best step in your custom workflow architecture." },
              { icon: Shield, title: "Enterprise Reliability", desc: "Built on Convex for real-time syncing, unbreakable state, and bulletproof security." }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white/80 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Business Impact Section */}
      <section id="impact" className="relative z-10 py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Transforming businesses,<br />One agent at a time.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-green-100 p-2 rounded-full h-fit"><BarChart className="w-5 h-5 text-green-600" /></div>
                <div>
                  <h4 className="font-bold text-xl">"Sleep while your AI works."</h4>
                  <p className="text-slate-600">Automate your 3AM customer support routing and data entry pipelines without waking up.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-blue-100 p-2 rounded-full h-fit"><Users className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <h4 className="font-bold text-xl">"Multiply your workforce instantly."</h4>
                  <p className="text-slate-600">Deploy a fleet of 50 intelligent agents to handle the workload of an entire department.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-orange-100 p-2 rounded-full h-fit"><HeartHandshake className="w-5 h-5 text-orange-600" /></div>
                <div>
                  <h4 className="font-bold text-xl">"Delight your users at scale."</h4>
                  <p className="text-slate-600">Provide instant, accurate, and hyper-personalized responses to thousands of queries simultaneously.</p>
                </div>
              </div>
            </div>
            <Link href="/dashboard" className="inline-block pt-4">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 h-auto text-lg">
                See it in action
              </Button>
            </Link>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-emerald-100 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
            <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-sm font-medium text-slate-400">Agent Performance</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((bar) => (
                  <div key={bar} className="h-12 bg-slate-50 rounded-xl relative overflow-hidden flex items-center px-4">
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 bg-blue-${600 - bar * 100} opacity-20`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${100 - bar * 15}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    ></motion.div>
                    <span className="relative z-10 text-sm font-bold text-slate-700">Workflow Node Execution #{bar}</span>
                    <span className="relative z-10 ml-auto text-sm font-bold text-blue-700">+{Math.floor(Math.random() * 400)}ms</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="relative z-10 py-32 bg-slate-900 text-white clip-path-slant overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by innovators worldwide</h2>
            <p className="text-xl text-slate-400">Don't just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins", role: "Product Ops at TechFlow",
                text: "Agent Hive completely changes the game. I was able to automate our entire triage pipeline without writing a single line of Python. The visual builder is gorgeous.",
                img: "https://i.pravatar.cc/150?img=47"
              },
              {
                name: "Marcus Chen", role: "Founder, RapidScale",
                text: "The transition from concept to living agent takes minutes. What used to take our engineering team two sprint cycles is now done by my marketing intern.",
                img: "https://i.pravatar.cc/150?img=11"
              },
              {
                name: "Elena Rodriguez", role: "CTO at Nexus Data",
                text: "The state management via Convex is what sold me. It's incredibly resilient. We've scaled to running 40 agents concurrently without a single hiccup or lost state.",
                img: "https://i.pravatar.cc/150?img=5"
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
                <div className="flex text-yellow-500 mb-6">
                  {Array(5).fill(0).map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
                </div>
                <p className="text-lg text-slate-300 mb-8 italic">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    {/* Fallback pattern in case external img block */}
                    <Image src={review.img} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <span className="text-sm text-blue-400">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center bg-blue-50 p-8 rounded-3xl mb-16">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Ready to unleash your agents?</h3>
              <p className="text-slate-600">Join thousands of creators building the autonomous future.</p>
            </div>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 h-auto text-lg shadow-xl shadow-blue-200">
                Start Building for Free
              </Button>
            </Link>
          </div>

          <div className="text-center pt-8 border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-lg">Agent Hive</span>
            </div>
            <p className="text-slate-500 font-medium pb-2 text-lg">
              Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> Love by Prabhu
            </p>
            <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Agent Hive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

