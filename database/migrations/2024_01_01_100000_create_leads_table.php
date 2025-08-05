<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('job_title')->nullable();
            $table->text('notes')->nullable();
            $table->enum('stage', ['lead', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'])->default('lead');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->decimal('value', 10, 2)->nullable()->comment('Potential deal value');
            $table->timestamp('last_contacted_at')->nullable();
            $table->timestamp('expected_close_date')->nullable();
            $table->string('source')->nullable()->comment('Lead source - e.g., website, referral, cold call');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('stage');
            $table->index('priority');
            $table->index(['user_id', 'stage']);
            $table->index(['user_id', 'created_at']);
            $table->index('expected_close_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};