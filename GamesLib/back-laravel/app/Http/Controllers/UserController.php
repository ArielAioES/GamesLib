<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(
        protected User $repository,
    )
    {

    }

    public function index()
    {
        $users = $this->repository->paginate();
        return UserResource::collection($users)->response()->setStatusCode(200);
    }

    public function store(StoreUpdateUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($request->password);

        $user = $this->repository->create($data);

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function show(string $id)
    {
        $user = $this->repository->findOrFail($id);

        return (new UserResource($user))->response()->setStatusCode(200);
    }

    public function update(StoreUpdateUserRequest $request, string $id)
    {
        $user = $this->repository->findOrFail($id);

        $data = $request->validated();

        if($request->password)
            $data['password'] = bcrypt($request->password);

        $user->update($data);

        return (new UserResource($user))->response()->setStatusCode(200);
    }

    public function destroy(string $id)
    {
        $user = $this->repository->findOrFail($id);
        $user->delete();

        return response()->json(['message'=> 'User successfully deleted'], 204);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => new UserResource($user),
            ])->setStatusCode(200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

}
