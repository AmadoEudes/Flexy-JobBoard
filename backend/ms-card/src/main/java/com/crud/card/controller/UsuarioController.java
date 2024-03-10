package com.crud.card.controller;

import com.crud.card.model.ServiceResponse;
import com.crud.card.model.Usuario;
import com.crud.card.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/Usuario")
@CrossOrigin(origins = "http://localhost:4200")

public class UsuarioController {

    @Autowired
    private IUsuarioService iUsuarioService;

    @GetMapping("/list")
    public ResponseEntity<List<Usuario>> list(){
        var result = iUsuarioService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Usuario usuario){
        ServiceResponse serviceResponse = new ServiceResponse();
        Usuario result = iUsuarioService.save(usuario);
        if (result != null){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Usuario usuario){
        ServiceResponse serviceResponse = new ServiceResponse();
        Usuario result = iUsuarioService.update(usuario);
        if (result != null){
            serviceResponse.setMessage("Usuario resgistrado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuarioService.deleteById(id);
        if (result == 1){
            serviceResponse.setMessage("Usuario eliminado correctamente");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/findUserId")
    public int findUserId(@RequestBody Usuario usuario){
        ServiceResponse serviceResponse = new ServiceResponse();
        int userId = iUsuarioService.findById(usuario);
        if (userId != 0){
            serviceResponse.setMessage("Id encontrado correctamente");
        }
        return iUsuarioService.findById(usuario);
    }
}
