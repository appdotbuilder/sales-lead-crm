<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Lead>
     */
    protected $model = Lead::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stages = ['lead', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];
        $priorities = ['low', 'medium', 'high'];
        $sources = ['Website', 'Referral', 'Cold Call', 'Email Campaign', 'Social Media', 'Trade Show', 'LinkedIn'];

        return [
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'company' => fake()->company(),
            'job_title' => fake()->jobTitle(),
            'notes' => fake()->optional(0.7)->paragraph(),
            'stage' => fake()->randomElement($stages),
            'priority' => fake()->randomElement($priorities),
            'value' => fake()->optional(0.8)->randomFloat(2, 1000, 100000),
            'last_contacted_at' => fake()->optional(0.6)->dateTimeBetween('-30 days', 'now'),
            'expected_close_date' => fake()->optional(0.5)->dateTimeBetween('now', '+90 days'),
            'source' => fake()->randomElement($sources),
        ];
    }

    /**
     * Indicate that the lead is a new lead.
     */
    public function newLead(): static
    {
        return $this->state(fn (array $attributes) => [
            'stage' => 'lead',
            'last_contacted_at' => null,
        ]);
    }

    /**
     * Indicate that the lead is high priority.
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
        ]);
    }

    /**
     * Indicate that the lead is closed won.
     */
    public function closedWon(): static
    {
        return $this->state(fn (array $attributes) => [
            'stage' => 'closed_won',
            'last_contacted_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ]);
    }

    /**
     * Indicate that the lead has high value.
     */
    public function highValue(): static
    {
        return $this->state(fn (array $attributes) => [
            'value' => fake()->randomFloat(2, 50000, 500000),
        ]);
    }
}