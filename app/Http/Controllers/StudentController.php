<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $students = Student::all();

        $data = [
            "msg" => "Get All Students",
            "data" => $students,
        ];

        return response()->json($data, 200);

    }
    

    public function store(Request $request) {
        
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan'=> $request->jurusan,
        ];

        $student = Student::create($input);

        $data = [
            "msg" => "Student is creataed successfully",
            "data" => $student,
        ];

        return response()->json($data, 201);

}

    public function update(Request $request, $id){
        $student = Student::find($id);

        if($student) {
           
        $input = [
            'nama' => $request->nama ?? $student->nama,
            'nim' => $request->nim  ?? $student->nim,
            'email' => $request->email ?? $student->email,
            'jurusan' => $request->jurusan ?? $student->jurusan
        ];

        $student->update($input);

        $data = [
            'msg'=> 'Student is Updated',
            'data'=> $student
        ];
        return response()->json($data, 200);
    }
    else {
        $data = [
            "msg"=> "Student not found"
        ];

        return response()->json($data, 404);
    }

}
    public function destroy($id){
        $student = Student::find($id);

        if($student) {

        $student->delete();

        $data = [
            'msg'=> 'Student is Updated'
        ];
        return response()->json($data, 200);
    }
    else {
        $data = [
            "msg"=> "Student not found"
        ];

        return response()->json($data, 404);
    }
}

    public function show($id){
    $student = Student::find($id);

    if ($student) {
        $data = [
            "msg"=> "Get Detail Student",
            "data"=> $student,
        ];
        return response()->json($data, 200);
    }
    else {
        $data = [
            "msg" => "Student not found",
        ];
        return response()->json($data, 404);
    }

}
}
