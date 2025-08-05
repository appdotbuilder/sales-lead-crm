<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the CRM dashboard.
     */
    public function index()
    {
        $userId = auth()->id();

        // Key statistics
        $stats = [
            'total_leads' => Lead::where('user_id', $userId)->count(),
            'new_leads' => Lead::where('user_id', $userId)->where('stage', 'lead')->count(),
            'qualified_leads' => Lead::where('user_id', $userId)->where('stage', 'qualified')->count(),
            'closed_won' => Lead::where('user_id', $userId)->where('stage', 'closed_won')->count(),
            'total_revenue' => Lead::where('user_id', $userId)
                ->where('stage', 'closed_won')
                ->sum('value'),
            'pipeline_value' => Lead::where('user_id', $userId)
                ->whereNotIn('stage', ['closed_won', 'closed_lost'])
                ->sum('value'),
        ];

        // Recent leads
        $recentLeads = Lead::where('user_id', $userId)
            ->latest()
            ->limit(5)
            ->get();

        // High priority leads
        $highPriorityLeads = Lead::where('user_id', $userId)
            ->where('priority', 'high')
            ->whereNotIn('stage', ['closed_won', 'closed_lost'])
            ->latest()
            ->limit(5)
            ->get();

        // Pipeline breakdown
        $pipeline = Lead::where('user_id', $userId)
            ->selectRaw('stage, COUNT(*) as count, COALESCE(SUM(value), 0) as total_value')
            ->groupBy('stage')
            ->get()
            ->map(function ($item) {
                $item->stage_display = match ($item->stage) {
                    'lead' => 'New Lead',
                    'contacted' => 'Contacted',
                    'qualified' => 'Qualified',
                    'proposal' => 'Proposal Sent',
                    'negotiation' => 'Negotiation',
                    'closed_won' => 'Closed Won',
                    'closed_lost' => 'Closed Lost',
                    default => $item->stage,
                };
                return $item;
            });

        // Leads needing follow-up (no contact in 7+ days)
        $needsFollowUp = Lead::where('user_id', $userId)
            ->whereNotIn('stage', ['closed_won', 'closed_lost'])
            ->where(function ($query) {
                $query->whereNull('last_contacted_at')
                      ->orWhere('last_contacted_at', '<', now()->subDays(7));
            })
            ->count();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentLeads' => $recentLeads,
            'highPriorityLeads' => $highPriorityLeads,
            'pipeline' => $pipeline,
            'needsFollowUp' => $needsFollowUp,
        ]);
    }
}