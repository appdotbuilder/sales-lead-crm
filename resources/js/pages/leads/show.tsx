import { AppShell } from '@/components/app-shell';
import { Head, Link, router } from '@inertiajs/react';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    job_title: string | null;
    notes: string | null;
    stage: string;
    priority: string;
    value: number | null;
    last_contacted_at: string | null;
    expected_close_date: string | null;
    source: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

interface Props {
    lead: Lead;
    [key: string]: unknown;
}

export default function ShowLead({ lead }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
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

    const getStageDisplay = (stage: string) => {
        switch (stage) {
            case 'lead':
                return 'New Lead';
            case 'contacted':
                return 'Contacted';
            case 'qualified':
                return 'Qualified';
            case 'proposal':
                return 'Proposal Sent';
            case 'negotiation':
                return 'Negotiation';
            case 'closed_won':
                return 'Closed Won';
            case 'closed_lost':
                return 'Closed Lost';
            default:
                return stage;
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
            router.delete(route('leads.destroy', lead.id));
        }
    };

    return (
        <AppShell>
            <Head title={`${lead.name} - Lead Details`} />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                👤 {lead.name}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStageColor(lead.stage)}`}>
                                    {getStageDisplay(lead.stage)}
                                </span>
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                                    {lead.priority} priority
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            {lead.company ? `${lead.job_title ? `${lead.job_title} at ` : ''}${lead.company}` : lead.job_title || 'Lead Details'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('leads.index')}
                            className="inline-flex items-center rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            ← Back to Leads
                        </Link>
                        <Link
                            href={route('leads.edit', lead.id)}
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            ✏️ Edit Lead
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                📞 Contact Information
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Email
                                    </label>
                                    <div className="flex items-center">
                                        <a
                                            href={`mailto:${lead.email}`}
                                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                                        >
                                            {lead.email}
                                        </a>
                                    </div>
                                </div>
                                
                                {lead.phone && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Phone
                                        </label>
                                        <div className="flex items-center">
                                            <a
                                                href={`tel:${lead.phone}`}
                                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                                            >
                                                {lead.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {lead.company && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Company
                                        </label>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {lead.company}
                                        </p>
                                    </div>
                                )}

                                {lead.job_title && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Job Title
                                        </label>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {lead.job_title}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        {lead.notes && (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📝 Notes
                                </h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {lead.notes}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Lead Status */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📊 Lead Status
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Current Stage
                                    </label>
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStageColor(lead.stage)}`}>
                                        {getStageDisplay(lead.stage)}
                                    </span>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Priority Level
                                    </label>
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                                        {lead.priority} priority
                                    </span>
                                </div>

                                {lead.value && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Deal Value
                                        </label>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {formatCurrency(lead.value)}
                                        </p>
                                    </div>
                                )}

                                {lead.source && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Lead Source
                                        </label>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {lead.source}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📅 Important Dates
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Created
                                    </label>
                                    <p className="text-gray-900 dark:text-white">
                                        {formatDateTime(lead.created_at)}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Last Updated
                                    </label>
                                    <p className="text-gray-900 dark:text-white">
                                        {formatDateTime(lead.updated_at)}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Last Contacted
                                    </label>
                                    <p className="text-gray-900 dark:text-white">
                                        {formatDate(lead.last_contacted_at)}
                                    </p>
                                    {lead.last_contacted_at && new Date(lead.last_contacted_at) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                                            ⚠️ Follow-up needed
                                        </p>
                                    )}
                                </div>

                                {lead.expected_close_date && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Expected Close Date
                                        </label>
                                        <p className="text-gray-900 dark:text-white">
                                            {formatDate(lead.expected_close_date)}
                                        </p>
                                        {new Date(lead.expected_close_date) < new Date() && lead.stage !== 'closed_won' && lead.stage !== 'closed_lost' && (
                                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                                🚨 Overdue
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                ⚡ Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${lead.email}`}
                                    className="flex items-center justify-center w-full rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                >
                                    📧 Send Email
                                </a>
                                {lead.phone && (
                                    <a
                                        href={`tel:${lead.phone}`}
                                        className="flex items-center justify-center w-full rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                                    >
                                        📞 Call Now
                                    </a>
                                )}
                                <Link
                                    href={route('leads.edit', lead.id)}
                                    className="flex items-center justify-center w-full rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
                                >
                                    ✏️ Update Status
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}