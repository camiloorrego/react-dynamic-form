import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

export default function Home(props) {
    const { controls, summit } = props;

    const [ErrorForm, SetErrorForm] = useState({});
    const [TouchForm, SetTouchForm] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {

        const init = () => {
            const ctrls = {};
            let errors = {};
            controls.forEach(c => {
                ctrls[c.name] = '';
                errors = { ...errors, [c.name]: { message: 'required', hasError: true } }
            });
            setFormData(ctrls);
            SetErrorForm(errors);
        }

        init();
    }, [controls]);

    const changeValue = (e) => {
        const values = formData;
        values[e.target.name] = e.target.value;
        setFormData({ ...formData });
        validate(e.target.value, e.target.name);
    };

    const validate = (value, control) => {

        const ctrl = controls.find(i => i.name === control);

        let item = {}

        if (!value) {
            item = { message: 'required', hasError: true };
        }

        if (ctrl.type === 'email' && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            item = { message: 'Invalid email address', hasError: true };
        }

        SetErrorForm({ ...ErrorForm, [control]: item });
    }

    const onBlur = (e) => {
        SetTouchForm({ ...TouchForm, [e.target.name]: true });
        validate(e.target.value, e.target.name);

    };

    const invalid = () => {
        let r = false;
        for (const key in ErrorForm) {
            if (ErrorForm.hasOwnProperty(key) && ErrorForm[key].hasError) {
                r = true;
                break;
            }
        }
        return r;
    }

    const onSummit = () => {
        summit(formData);
    };

    const showError = (name) => {
        return (TouchForm[name] === true
            && ErrorForm[name] && ErrorForm[name].hasError === true);
    };

    return (
        <div>
            <header>
                <h3>Dynamic form</h3>
            </header>
            <form autoComplete="off">
                <Grid container spacing={2}>
                    {controls.map((row) => (
                        <Grid item xs={6} key={row.name}>
                            <TextField
                                fullWidth
                                name={row.name}
                                label={row.label}
                                error={showError(row.name)}
                                required
                                type="text"
                                onChange={changeValue}
                                helperText={TouchForm[row.name] === true && ErrorForm[row.name]?.message}
                                onBlur={(e) => onBlur(e)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div>
                    <Button disabled={invalid()} onClick={onSummit} variant="contained" color="primary">Primary</Button>
                </div>
            </form>
            {/* {JSON.stringify(formData)} */}
            {JSON.stringify(ErrorForm)}
            {/* {JSON.stringify(TouchForm)} */}
        </div>
    );
}
