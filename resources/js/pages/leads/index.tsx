import { AppShell } from '@/components/app-shell';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    job_title: string | null;
    stage: string;
    priority: string;
    value: number | null;
    last_contacted_at: string | null;
    expected_close_date: string | null;
    source: string | null;
    created_at: string;
    [key: string]: unknown;
}

interface Stats {
    total_leads: number;
    new_leads: number;
    qualified_leads: number;
    closed_won: number;
    total_value: number;
    pipeline_value: number;
}

interface PipelineStage {
    stage: string;
    count: number;
    total_value: number;
}

interface Filters {
    stage?: string;
    priority?: string;
    search?: string;
}

interface Props {
    leads: {
        data: Lead[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            to: number;
            total: number;
        };
    };
    stats: Stats;
    pipeline: Record<string, PipelineStage>;
    filters: Filters;
    [key: string]: unknown;
}

export default function LeadsIndex({ leads, stats, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString();
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

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('leads.index'), { ...filters, search }, { preserveState: true });
    };

    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters };
        if (newFilters[key as keyof Filters] === value) {
            delete newFilters[key as keyof Filters];
        } else {
            newFilters[key as keyof Filters] = value;
        }
        router.get(route('leads.index'), newFilters, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        router.get(route('leads.index'));
    };

    return (
        <AppShell>
            <Head title="Leads Management" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👥 Leads Management
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage your sales prospects and track their progress through the pipeline.
                        </p>
                    </div>
                    <Link
                        href={route('leads.create')}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                        ➕ Add New Lead
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Leads</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_leads}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">🆕</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Leads</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.new_leads}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Qualified</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.qualified_leads}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">💰</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pipeline Value</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.pipeline_value)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                    <div className="space-y-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search leads by name, email, or company..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                🔍 Search
                            </button>
                        </form>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Filters:</span>
                            
                            {/* Stage Filters */}
                            {['lead', 'contacted', 'qualified', 'proposal', 'negotiation'].map((stage) => (
                                <button
                                    key={stage}
                                    onClick={() => handleFilter('stage', stage)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                        filters.stage === stage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {stage.replace('_', ' ')}
                                </button>
                            ))}

                            {/* Priority Filters */}
                            {['high', 'medium', 'low'].map((priority) => (
                                <button
                                    key={priority}
                                    onClick={() => handleFilter('priority', priority)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                        filters.priority === priority
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {priority} priority
                                </button>
                            ))}

                            {(filters.stage || filters.priority || filters.search) && (
                                <button
                                    onClick={clearFilters}
                                    className="rounded-full px-3 py-1 text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 overflow-hidden">
                    {leads.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Lead
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Company
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Stage
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Priority
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Value
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Last Contact
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {leads.data.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {lead.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {lead.email}
                                                        </div>
                                                        {lead.phone && (
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {lead.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {lead.company || '—'}
                                                    </div>
                                                    {lead.job_title && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {lead.job_title}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(lead.stage)}`}>
                                                        {lead.stage.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                                                        {lead.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {lead.value ? formatCurrency(lead.value) : '—'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {formatDate(lead.last_contacted_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('leads.show', lead.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('leads.edit', lead.id)}
                                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {leads.meta.last_page > 1 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            Showing {leads.meta.from} to {leads.meta.to} of {leads.meta.total} results
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {leads.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-3 py-2 text-sm rounded-md ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : link.url
                                                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                {filters.search || filters.stage || filters.priority ? 'No leads found' : 'No leads yet'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {filters.search || filters.stage || filters.priority 
                                    ? 'Try adjusting your filters to find leads.'
                                    : 'Get started by creating your first lead.'
                                }
                            </p>
                            {filters.search || filters.stage || filters.priority ? (
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                                >
                                    Clear Filters
                                </button>
                            ) : (
                                <Link
                                    href={route('leads.create')}
                                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                                >
                                    ➕ Create First Lead
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}