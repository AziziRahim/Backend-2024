<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function register(Request $request){
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email'=> 'email|required',
            'password'=> 'required|min:6'
        ]);

        if($validator->fails()) {
            return response()->json([
                'msg'=> 'Validation errors',
                'errors' => $validator->errors()], 422);
        }

        $request->password = Hash::make($request->password);

        $user = User::create($request->all());

        $data = [
            'msg' => 'User is create successfully'
        ];

        return response()->json($data, 200);
    }

    public function login(Request $request){
    
        $input = [
            'email' => $request->email,
            'password'=> $request->password
        ];

        $user = User::where('email', $input['email'])->first();


        $isLoginSuccesfully = (
            $input['email'] == $user->email
            &&
            Hash::check($input['password'], $user->password)
        );

        if($isLoginSuccesfully){
            #membuat token
            $token = $user->createToken('auth_token');

            $data = [
                'msg' => 'Login Succesfully',
                'token' => $token->plainTextToken
            ];

            return response()->json($data, 200);
        }

        else {
            $data = [
                'msg' => 'Username or Password is wrong'
            ];

            return response()->json($data, 401);
        }
    
    }
}
