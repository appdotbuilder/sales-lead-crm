<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Lead::where('user_id', auth()->id())
            ->with('user')
            ->latest();

        // Filter by stage if provided
        if ($request->filled('stage')) {
            $query->where('stage', $request->stage);
        }

        // Filter by priority if provided
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        $leads = $query->paginate(15)->withQueryString();

        // Dashboard statistics
        $stats = [
            'total_leads' => Lead::where('user_id', auth()->id())->count(),
            'new_leads' => Lead::where('user_id', auth()->id())->where('stage', 'lead')->count(),
            'qualified_leads' => Lead::where('user_id', auth()->id())->where('stage', 'qualified')->count(),
            'closed_won' => Lead::where('user_id', auth()->id())->where('stage', 'closed_won')->count(),
            'total_value' => Lead::where('user_id', auth()->id())
                ->where('stage', 'closed_won')
                ->sum('value'),
            'pipeline_value' => Lead::where('user_id', auth()->id())
                ->whereNotIn('stage', ['closed_won', 'closed_lost'])
                ->sum('value'),
        ];

        // Leads by stage for pipeline view
        $pipeline = Lead::where('user_id', auth()->id())
            ->selectRaw('stage, COUNT(*) as count, COALESCE(SUM(value), 0) as total_value')
            ->groupBy('stage')
            ->get()
            ->keyBy('stage');

        return Inertia::render('leads/index', [
            'leads' => $leads,
            'stats' => $stats,
            'pipeline' => $pipeline,
            'filters' => $request->only(['stage', 'priority', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('leads/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create($request->validated());

        return redirect()->route('leads.show', $lead)
            ->with('success', 'Lead created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        // Ensure user can only view their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('leads/show', [
            'lead' => $lead->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead)
    {
        // Ensure user can only edit their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('leads/edit', [
            'lead' => $lead,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $lead->update($request->validated());

        return redirect()->route('leads.show', $lead)
            ->with('success', 'Lead updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        // Ensure user can only delete their own leads
        if ($lead->user_id !== auth()->id()) {
            abort(403);
        }

        $lead->delete();

        return redirect()->route('leads.index')
            ->with('success', 'Lead deleted successfully!');
    }
}