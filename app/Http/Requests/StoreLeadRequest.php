<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'stage' => 'required|in:lead,contacted,qualified,proposal,negotiation,closed_won,closed_lost',
            'priority' => 'required|in:low,medium,high',
            'value' => 'nullable|numeric|min:0|max:999999999.99',
            'last_contacted_at' => 'nullable|date',
            'expected_close_date' => 'nullable|date|after_or_equal:today',
            'source' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Lead name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'stage.required' => 'Please select a stage.',
            'stage.in' => 'Invalid stage selected.',
            'priority.required' => 'Please select a priority level.',
            'priority.in' => 'Invalid priority level selected.',
            'value.numeric' => 'Lead value must be a number.',
            'value.min' => 'Lead value cannot be negative.',
            'expected_close_date.after_or_equal' => 'Expected close date must be today or in the future.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Add the authenticated user's ID
        $this->merge([
            'user_id' => auth()->id(),
        ]);
    }
}