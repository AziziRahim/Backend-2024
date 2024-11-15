<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlumniController extends Controller
{
    public function index()
    {
        $alumnis = Alumni::all();
        
        if ($alumnis->isNotEmpty()) {
            return response()->json([
                "msg" => "Get All Alumni",
                "data" => $alumnis,
            ], 200);
        } else {
            return response()->json([
                "msg"=> "Alumni is empty"
            ], 200);
        }
    }

    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'alamat' => 'required|string|max:255',
            'tahun_lulus' => 'required|integer',
            'status' => 'required|string|max:50',
            'company_name' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $alumni = Alumni::create($request->all());
        return response()->json([
            'msg' => 'Alumni created successfully',
            'data' => $alumni
        ], 201);
    }

    public function show($id)
    {
        $alumni = Alumni::find($id);
        if ($alumni) {
            return response()->json([
                'msg' => 'Alumni found',
                'data' => $alumni
            ], 200);
        } else {
            return response()->json([
                'msg' => 'Alumni not found'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $alumni = Alumni::find($id);
        if ($alumni) {
            // Validasi input
            $validator = Validator::make($request->all(), [
                'nama' => 'sometimes|required|string|max:255',
                'phone' => 'sometimes|required|string|max:20',
                'alamat' => 'sometimes|required|string|max:255',
                'tahun_lulus' => 'sometimes|required|integer',
                'status' => 'sometimes|required|string|max:50',
                'company_name' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $alumni->update($request->all());
            return response()->json([
                'msg' => 'Alumni updated successfully',
                'data' => $alumni
            ], 200);
        } else {
            return response()->json([
                'msg' => 'Alumni not found'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $alumni = Alumni::find($id);
        if ($alumni) {
            $alumni->delete();
            return response()->json([
                'msg' => 'Alumni deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'msg' => 'Alumni not found'
            ], 404);
        }
    }

    public function search($name)
    {
        $alumnis = Alumni::where('nama', 'like', '%' . $name . '%')->get();
        if ($alumnis->isNotEmpty()) {
            return response()->json([
                'msg' => 'Search results',
                'data' => $alumnis
            ], 200);
        } else {
            return response()->json([
                'msg' => 'No alumni found'
            ], 404);
        }
    }

    public function freshGraduate()
    {
        $alumnis = Alumni::where('status', 'fresh-graduate')->get();
        return response()->json([
            'msg' => 'Fresh Graduates',
            'data' => $alumnis
        ], 200);
    }

    public function employed()
    {
        $alumnis = Alumni::where('status', 'employed')->get();
        return response()->json([
            'msg' => 'Employed Alumni',
            'data' => $alumnis
        ], 200);
    }

    public function unemployed()
    {
        $alumnis = Alumni::where('status', 'unemployed')->get ();
        return response()->json([
            'msg' => 'Unemployed Alumni',
            'data' => $alumnis
        ], 200);
    }
}