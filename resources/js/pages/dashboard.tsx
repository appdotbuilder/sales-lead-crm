import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Lead {
    id: number;
    name: string;
    email: string;
    company: string | null;
    stage: string;
    priority: string;
    value: number | null;
    created_at: string;
    [key: string]: unknown;
}

interface PipelineStage {
    stage: string;
    stage_display: string;
    count: number;
    total_value: number;
}

interface Stats {
    total_leads: number;
    new_leads: number;
    qualified_leads: number;
    closed_won: number;
    total_revenue: number;
    pipeline_value: number;
}

interface Props {
    stats: Stats;
    recentLeads: Lead[];
    highPriorityLeads: Lead[];
    pipeline: PipelineStage[];
    needsFollowUp: number;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentLeads, highPriorityLeads, pipeline, needsFollowUp }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'lead':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
            case 'contacted':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'qualified':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'proposal':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'negotiation':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'closed_won':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'closed_lost':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };



    const statCards = [
        {
            title: 'Total Leads',
            value: stats.total_leads,
            icon: '👥',
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'New Leads',
            value: stats.new_leads,
            icon: '🆕',
            color: 'from-green-500 to-green-600',
        },
        {
            title: 'Qualified',
            value: stats.qualified_leads,
            icon: '✅',
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            title: 'Won Deals',
            value: stats.closed_won,
            icon: '🎉',
            color: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.total_revenue),
            icon: '💰',
            color: 'from-green-500 to-emerald-600',
            isRevenue: true,
        },
        {
            title: 'Pipeline Value',
            value: formatCurrency(stats.pipeline_value),
            icon: '📈',
            color: 'from-indigo-500 to-indigo-600',
            isRevenue: true,
        },
    ];

    return (
        <AppShell>
            <Head title="CRM Dashboard" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🚀 Sales Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Welcome back! Here's what's happening with your leads.
                        </p>
                    </div>
                    <Link
                        href={route('leads.create')}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                        ➕ Add New Lead
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {statCards.map((stat, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`}></div>
                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl">{stat.icon}</div>
                                    <div className={`rounded-lg bg-gradient-to-r ${stat.color} p-2 text-white`}>
                                        <div className="h-4 w-4"></div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className={`text-2xl font-bold text-gray-900 dark:text-white ${stat.isRevenue ? 'text-lg' : ''}`}>
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Alerts */}
                {needsFollowUp > 0 && (
                    <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⚠️</div>
                            <div>
                                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                    Follow-up Required
                                </h3>
                                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                    You have {needsFollowUp} leads that haven't been contacted in over 7 days.{' '}
                                    <Link href={route('leads.index')} className="font-semibold underline">
                                        Review them now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Leads */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📋 Recent Leads
                            </h2>
                            <Link
                                href={route('leads.index')}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentLeads.length > 0 ? (
                                recentLeads.map((lead) => (
                                    <div
                                        key={lead.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {lead.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {lead.company ? `${lead.email} • ${lead.company}` : lead.email}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStageColor(lead.stage)}`}>
                                                    {lead.stage.replace('_', ' ')}
                                                </span>
                                                {lead.value && (
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                                        {formatCurrency(lead.value)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href={route('leads.show', lead.id)}
                                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 ml-4"
                                        >
                                            View
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📝</div>
                                    <p className="text-gray-600 dark:text-gray-400">No leads yet</p>
                                    <Link
                                        href={route('leads.create')}
                                        className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Create your first lead →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* High Priority Leads */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                🔥 High Priority Leads
                            </h2>
                            <Link
                                href={route('leads.index', { priority: 'high' })}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {highPriorityLeads.length > 0 ? (
                                highPriorityLeads.map((lead) => (
                                    <div
                                        key={lead.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {lead.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {lead.company ? `${lead.email} • ${lead.company}` : lead.email}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStageColor(lead.stage)}`}>
                                                    {lead.stage.replace('_', ' ')}
                                                </span>
                                                {lead.value && (
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                                        {formatCurrency(lead.value)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href={route('leads.show', lead.id)}
                                            className="text-red-600 hover:text-red-500 dark:text-red-400 ml-4"
                                        >
                                            View
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">✨</div>
                                    <p className="text-gray-600 dark:text-gray-400">No high priority leads</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sales Pipeline */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        📊 Sales Pipeline
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                        {['lead', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'].map((stageKey) => {
                            const stage = pipeline.find(p => p.stage === stageKey);
                            const count = stage?.count || 0;
                            const value = stage?.total_value || 0;
                            const displayName = stage?.stage_display || stageKey.replace('_', ' ');
                            
                            return (
                                <div
                                    key={stageKey}
                                    className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                                >
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        {displayName}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {count}
                                    </p>
                                    {value > 0 && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {formatCurrency(value)}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}