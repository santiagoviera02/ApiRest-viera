import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteI } from 'src/app/modelos/paciente.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { ResponseI } from 'src/app/modelos/response.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  datos: string;

  constructor(private activerouter: ActivatedRoute, private router: Router, private api: ApiService) { }

  datosPaciente: PacienteI;
  editarForm = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl('')
  })

  ngOnInit(): void {
    let pacienteid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSinglePactient(pacienteid).subscribe((data: any) => {
      this.datosPaciente = data[0];
      this.editarForm.setValue({
        'nombre': this.datosPaciente.Nombre,
        'correo': this.datosPaciente.Correo,
        'dni': this.datosPaciente.DNI,
        'direccion': this.datosPaciente.Direccion,
        'codigoPostal': this.datosPaciente.CodigoPostal,
        'genero': this.datosPaciente.Genero,
        'telefono': this.datosPaciente.Telefono,
        'token': token,
        'pacienteId': pacienteid,
        'fechaNacimiento': this.datosPaciente.FechaNacimiento
      });
      // this.editarForm = this.fb.group({
      //   nombre: '',
      //   correo: '',
      //   dni: '',
      //   direccion: '',
      //   codigoPostal: '',
      //   genero: '',
      //   telefono: '',
      //   fechaNacimiento: ''
      // })
      // this.activerouter.params.subscribe(params => {
      //   this.editarForm.get('nombre')?.patchValue(this.Paciente.Nombre);
      //   this.editarForm.get('correo')?.patchValue(this.Paciente.Correo);
      //   this.editarForm.get('direccion')?.patchValue(this.Paciente.Direccion);
      //   this.editarForm.get('codigoPostal')?.patchValue(this.Paciente.CodigoPostal);
      //   this.editarForm.get('genero')?.patchValue(this.Paciente.Genero);
      //   this.editarForm.get('telefono')?.patchValue(this.Paciente.Telefono);
      //   this.editarForm.get('fechaNacimiento')?.patchValue(this.Paciente.FechaNacimiento);
      // })
    });
  }


  getToken() {
    return localStorage.getItem('token');
  }


  postForm(form: PacienteI) {
    this.api.putPatient(form).subscribe((data: any) => {
      let respuesta: ResponseI = data;
      if (respuesta.status == "ok") { }
    })
  }

  eliminar() {
    // let datos: PacienteI = this.editarForm.value;
    // this.api.deletePatient(datos).subscribe(data => {
    //   let respuesta: ResponseI = data;
    //   if (respuesta.status == "ok") {
    //     this.router.navigate(['dashboard']);
    //   } else {
    //   }
    // })
  }

  salir() {
    this.router.navigate(['dashboard']);
  }

}
