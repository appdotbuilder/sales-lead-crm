import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: '👥',
            title: 'Lead Management',
            description: 'Organize and track all your sales prospects in one centralized system with detailed contact information and custom fields.',
        },
        {
            icon: '📈',
            title: 'Sales Pipeline',
            description: 'Visualize your deals as they progress through different stages from initial contact to closed won.',
        },
        {
            icon: '🎯',
            title: 'Priority Tracking',
            description: 'Set priority levels for leads and focus on high-value opportunities that need immediate attention.',
        },
        {
            icon: '💰',
            title: 'Revenue Analytics',
            description: 'Track deal values, pipeline worth, and actual revenue to measure your sales performance.',
        },
        {
            icon: '📊',
            title: 'Dashboard Insights',
            description: 'Get real-time insights with comprehensive analytics and performance metrics at a glance.',
        },
        {
            icon: '🔔',
            title: 'Follow-up Reminders',
            description: 'Never miss an opportunity with automatic tracking of leads that need follow-up attention.',
        },
    ];

    return (
        <>
            <Head title="Sales CRM - Manage Your Leads Effectively">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <header className="relative">
                    <nav className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl">
                                🤝
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">SalesCRM</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                                    >
                                        Get Started Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                            🚀 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transform Your Sales</span> Process
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
                            Powerful CRM built for modern sales teams. Track leads, manage your pipeline, and close more deals with intelligent insights and automation.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {!auth.user ? (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                                    >
                                        Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                                >
                                    Access Your CRM →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Everything you need to manage leads effectively
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Comprehensive tools designed to streamline your sales process and maximize conversions.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-5xl">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 shadow-sm transition-all hover:shadow-lg hover:scale-105"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-2xl">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to supercharge your sales?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                                Join thousands of sales professionals who trust our CRM to manage their leads and close more deals.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {!auth.user ? (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-50 hover:scale-105"
                                        >
                                            Get Started Now
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-blue-600 transition-all"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-50 hover:scale-105"
                                    >
                                        Go to Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black">
                    <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                                🤝
                            </div>
                            <span className="text-xl font-bold text-white">SalesCRM</span>
                        </div>
                        <div className="mt-8 md:mt-0">
                            <p className="text-center text-xs leading-5 text-gray-400">
                                Built with ❤️ for sales professionals everywhere
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}