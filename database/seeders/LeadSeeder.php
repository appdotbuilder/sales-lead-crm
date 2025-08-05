<?php

namespace Database\Seeders;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Seeder;

class LeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user or create one if none exist
        $user = User::first();
        
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Demo User',
                'email' => 'demo@example.com',
            ]);
        }

        // Create sample leads with realistic data
        $sampleLeads = [
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@techcorp.com',
                'phone' => '+1 (555) 123-4567',
                'company' => 'TechCorp Solutions',
                'job_title' => 'VP of Sales',
                'stage' => 'qualified',
                'priority' => 'high',
                'value' => 45000,
                'source' => 'LinkedIn',
                'notes' => 'Interested in our enterprise solution. Has budget approved for Q1. Follow up next week to schedule demo.',
                'last_contacted_at' => now()->subDays(3),
                'expected_close_date' => now()->addDays(21),
            ],
            [
                'name' => 'Michael Chen',
                'email' => 'mchen@innovatetech.io',
                'phone' => '+1 (555) 234-5678',
                'company' => 'InnovateTech',
                'job_title' => 'CTO',
                'stage' => 'proposal',
                'priority' => 'high',
                'value' => 78000,
                'source' => 'Website',
                'notes' => 'Sent proposal last week. Very interested in our AI integration features. Scheduled follow-up call for Thursday.',
                'last_contacted_at' => now()->subDays(1),
                'expected_close_date' => now()->addDays(14),
            ],
            [
                'name' => 'Emily Rodriguez',
                'email' => 'emily.r@startup.com',
                'phone' => '+1 (555) 345-6789',
                'company' => 'StartupXYZ',
                'job_title' => 'Founder & CEO',
                'stage' => 'negotiation',
                'priority' => 'medium',
                'value' => 25000,
                'source' => 'Referral',
                'notes' => 'Price-sensitive but very interested. Negotiating payment terms. Referred by John from TechCorp.',
                'last_contacted_at' => now()->subDays(2),
                'expected_close_date' => now()->addDays(10),
            ],
            [
                'name' => 'David Williams',
                'email' => 'dwilliams@bigcorp.com',
                'phone' => '+1 (555) 456-7890',
                'company' => 'BigCorp Industries',
                'job_title' => 'Director of Operations',
                'stage' => 'contacted',
                'priority' => 'medium',
                'value' => 120000,
                'source' => 'Cold Call',
                'notes' => 'Initial call went well. Interested in our scalability features. Needs to discuss with team before moving forward.',
                'last_contacted_at' => now()->subDays(5),
                'expected_close_date' => now()->addDays(45),
            ],
            [
                'name' => 'Lisa Thompson',
                'email' => 'lisa@creativeagency.com',
                'phone' => '+1 (555) 567-8901',
                'company' => 'Creative Agency Plus',
                'job_title' => 'Creative Director',
                'stage' => 'lead',
                'priority' => 'low',
                'value' => 15000,
                'source' => 'Social Media',
                'notes' => 'Downloaded our whitepaper. Small agency looking for creative project management tools.',
                'last_contacted_at' => null,
                'expected_close_date' => now()->addDays(60),
            ],
            [
                'name' => 'Robert Kim',
                'email' => 'robert.kim@enterprise.com',
                'phone' => '+1 (555) 678-9012',
                'company' => 'Enterprise Solutions Ltd',
                'job_title' => 'IT Manager',
                'stage' => 'closed_won',
                'priority' => 'high',
                'value' => 95000,
                'source' => 'Trade Show',
                'notes' => 'Closed! Great client, very satisfied with our onboarding process. Potential for upselling next quarter.',
                'last_contacted_at' => now()->subDays(1),
                'expected_close_date' => now()->subDays(3),
            ],
            [
                'name' => 'Anna Martinez',
                'email' => 'anna.m@retailchain.com',
                'phone' => '+1 (555) 789-0123',
                'company' => 'Retail Chain Co',
                'job_title' => 'Operations Manager',
                'stage' => 'qualified',
                'priority' => 'medium',
                'value' => 35000,
                'source' => 'Email Campaign',
                'notes' => 'Responded to our email campaign about inventory management. Has specific requirements for multi-location setup.',
                'last_contacted_at' => now()->subDays(4),
                'expected_close_date' => now()->addDays(30),
            ],
            [
                'name' => 'James Anderson',
                'email' => 'j.anderson@nonprofit.org',
                'phone' => '+1 (555) 890-1234',
                'company' => 'Community Nonprofit',
                'job_title' => 'Executive Director',
                'stage' => 'closed_lost',
                'priority' => 'low',
                'value' => 8000,
                'source' => 'Referral',
                'notes' => 'Budget constraints prevented them from moving forward. Keep in touch for future opportunities.',
                'last_contacted_at' => now()->subDays(10),
                'expected_close_date' => now()->subDays(5),
            ],
            [
                'name' => 'Jennifer Lee',
                'email' => 'jennifer@consultingfirm.com',
                'phone' => '+1 (555) 901-2345',
                'company' => 'Strategic Consulting Firm',
                'job_title' => 'Partner',
                'stage' => 'contacted',
                'priority' => 'high',
                'value' => 150000,
                'source' => 'Website',
                'notes' => 'Large consulting firm interested in enterprise package. Multiple stakeholders involved in decision process.',
                'last_contacted_at' => now()->subDays(6),
                'expected_close_date' => now()->addDays(90),
            ],
            [
                'name' => 'Mark Davis',
                'email' => 'mark.davis@healthtech.com',
                'phone' => '+1 (555) 012-3456',
                'company' => 'HealthTech Solutions',
                'job_title' => 'Product Manager',
                'stage' => 'lead',
                'priority' => 'medium',
                'value' => 42000,
                'source' => 'Google Ads',
                'notes' => 'Healthcare industry lead. Interested in our compliance features. Need to schedule discovery call.',
                'last_contacted_at' => null,
                'expected_close_date' => now()->addDays(75),
            ],
        ];

        foreach ($sampleLeads as $leadData) {
            Lead::create(array_merge($leadData, ['user_id' => $user->id]));
        }

        // Create some additional random leads
        Lead::factory(20)->create(['user_id' => $user->id]);
    }
}