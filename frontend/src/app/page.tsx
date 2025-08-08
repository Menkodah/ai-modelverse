'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  BarChart3, 
  Code, 
  Play, 
  ArrowRight,
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Users,
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-secondary-900/20" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Model Maker PRO - The ModelVerse
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Create</span> the Future of{' '}
              <span className="gradient-text">AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Build, train, and deploy custom AI models with the most advanced platform. 
              From simple classifiers to complex neural networks, ModelVerse empowers you to create the next generation of AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Start Building
              </Link>
              <Link href="/demo" className="btn-outline text-lg px-8 py-4">
                <ArrowRight className="w-5 h-5 mr-2" />
                Watch Demo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center space-x-8 text-dark-400"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                <span>Free Tier Available</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                <span>Setup in Minutes</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to Build{' '}
              <span className="gradient-text">AI Models</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              From data preparation to model deployment, ModelVerse provides all the tools you need to create production-ready AI models.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glass group hover:neon-glow transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-dark-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-dark-800 to-dark-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-dark-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Build Your First{' '}
              <span className="gradient-text">AI Model</span>?
            </h2>
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and researchers who are already creating the future with ModelVerse.
            </p>
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              <ArrowRight className="w-5 h-5 mr-2" />
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Brain,
    title: 'Advanced Model Creation',
    description: 'Create complex neural networks with our intuitive drag-and-drop interface or code directly in Python.'
  },
  {
    icon: Zap,
    title: 'AutoML & Optimization',
    description: 'Automatically find the best hyperparameters and architecture for your models with our AutoML engine.'
  },
  {
    icon: Globe,
    title: 'Model Marketplace',
    description: 'Share and discover pre-trained models from the community. Buy, sell, or collaborate on AI models.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with role-based access control, audit logging, and data encryption.'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Monitor model performance, track training progress, and get insights with comprehensive analytics.'
  },
  {
    icon: Cloud,
    title: 'One-Click Deployment',
    description: 'Deploy your models to production with a single click. Scale automatically with our cloud infrastructure.'
  }
]

const stats = [
  { value: '10K+', label: 'Models Created' },
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' }
]
