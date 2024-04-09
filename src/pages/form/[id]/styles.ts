import styled from 'styled-components';
import { Select as SelectMaterial,TextField as TextFieldMaterial } from "@material-ui/core";
export const AreaForm = styled.div`
    max-width: 90%;
    width: 39rem;
    height: auto;
    padding: 2rem;
    margin: 3.125rem auto 0 auto;
    display:flex;
    flex-direction: column;
    gap: 3.125rem;
    border-radius: .5rem;
    background: #FFF;
    h3 {
        font-size: 1,125rem;
        color: #302e45;
        font-weight: bold;
    }
    form{
        display:flex;
        flex-direction: column;
        gap: 2.125rem;  
    }
`
export const Span = styled.span`
    font-size: .875rem;
    color: #302e45;
    font-weight: 400 !important;
`

export const Select = styled(SelectMaterial)`
    color: #302e45;
    background: none;
    padding-bottom: 1rem;
`
export const TextField = styled(TextFieldMaterial)`
    color: #302e45;
    background: none;
`
export const TextError = styled.p`
    color: red;
    font-size: .8rem;
`