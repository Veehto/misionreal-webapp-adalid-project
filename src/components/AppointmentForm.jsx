import { useEffect, useState } from "react";
import { useRef } from "react";
import DOMPurify from "dompurify";
import StatusMessage from "./StatusMessage";

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        rut: '',
        name: '',
        specialty: '',
        doctor: '',
        date: '',
        time: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState('');
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        setFormData({...formData, [event.target.name]: sanitizedValue});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const sanitizedFormData = {
            rut: DOMPurify.sanitize(formData.rut),
            name: DOMPurify.sanitize(formData.name),
            specialty: DOMPurify.sanitize(formData.specialty),
            doctor: DOMPurify.sanitize(formData.doctor),
            date: DOMPurify.sanitize(formData.date),
            time: DOMPurify.sanitize(formData.time),
        };

        console.log('Form sent successfully', sanitizedFormData);
        setStatus('Hora agendada correctamente');
        setIsSubmitted(true);
    };

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const handleKeyPress = (event) => {
        const charCode = event.charCode;
        if (charCode >= 48 && charCode <= 57) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        handleFocus();
    }, []);


    return (
        <>
            <section className="pt-1 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Reserva tu hora</h1>
                        <p className="lead text-body-secondary">
                            Llena el formulario y deja tu hora reservada con tu profesional acá.
                        </p>
                        {/* <p>
                            <a href="#" class="btn btn-primary my-2">Main call to action</a>
                            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                        </p> */}
                    </div>
                </div>
            </section>
        
            <div className='row'>
                <div className='col'>
                    <div className="card mt-2">
                        <div className="card-body">
                            <form className="contact-form pb-2" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="htmlForm-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            RUT
                                        </label>
                                    </div>
                                    <div className="htmlForm-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Pasaporte
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="text"
                                        name="rut"
                                        className="form-control"
                                        placeholder="Rut o Pasaporte"
                                        value={formData.rut}
                                        onChange={handleChange}
                                        ref={inputRef}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Nombre del paciente"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyPress}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="text"
                                        name="specialty"
                                        className="form-control"
                                        placeholder="Especialidad"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyPress}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="text"
                                        name="doctor"
                                        className="form-control"
                                        placeholder="Especialista"
                                        value={formData.doctor}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyPress}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="Fecha"
                                        className="form-control"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="time"
                                        name="time"
                                        placeholder="Hora"
                                        className="form-control"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <div className="d-grip gap-2">
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </div>
                            </form>
                            {status && <StatusMessage status={status} />}
                            {isSubmitted && (
                                <div className="text-center">
                                    <h3>Tu Hora al Médico:</h3>
                                    <p>{formData.name}</p>
                                    <p>{formData.specialty}</p>
                                    <p>{formData.doctor}</p>
                                    <p>{formData.date}</p>
                                    <p>{formData.time}</p>
                                </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

/*
    In this example, the user input is sanitized using the DOMPurify library before being stored in the component's state. Sanitize the user input before using it 
    in any way that could potentially introduce XSS vulnerabilities. This includes sanitizing the input before displaying it or sending it to the server.
    User input is sanitized both when it is entered and when the form is submitted, effectively preventing cross-site scripting (XSS) attacks.
*/