<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateUserRequest extends FormRequest
{
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

        $rules = [
            'name_user' => 'required|min:3|max:255',
            'email_user' => [
                'required',
                'email',
                'max:255',
                'unique:users'
            ],
            'password_user' => [
                'required',
                'min:6',
                'max:100'

            ],
        ];

        if($this->method() === 'PATCH'){
            $rules['email_user'] = [
                'required',
                'email',
                'max:255',
                // "unique:users,email,{$this->id},id"
                Rule::unique('users')->ignore($this->id),
            ];
            
            $rules['password_user'] = [
                'nullable',
                'min:6',
                'max:100'
            ];

        
        }

        return $rules;
        
    }
}
