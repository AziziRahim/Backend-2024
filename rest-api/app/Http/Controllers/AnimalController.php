<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{   
    public $animals = [
        ["name" => "Kucing"],
        ["name" => "Ayam"],
        ["name" => "Ikan"]

    ];

    public function index(){

        echo "Menampilkan data animal";
        foreach($this -> animals as $animal) {
            echo "\n";
            echo "-" ,   $animal['name'];
        }
    }

    public function store(Request $animal){

        array_push($this->animals, $animal);
        $this->index();
    
    }

    public function update(Request $animal, string $id){
        $this->animals[$id - 1] = $animal;
        $this->index();
    }

    public function destroy($id){

        echo "Menghapus" , $id;
        unset($this->animals[$id - 1]);
        $this->index();
    }
    
}




