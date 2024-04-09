import styled from 'styled-components';

export const ContainerHome = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 2rem;
`

export const ContentHome = styled.div`
    width: 90%;
    height: 8rem;
    background: #fff;
    border-radius: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3.4rem;
    margin-bottom: 2rem;
    @media (max-width: 768px) {
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }
`

export const BoxNameEnterprise = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    width: 100%;
    @media (max-width: 600px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
    }
`
export const IconArea = styled.div`
    display: flex;
    gap: .7rem;
    span{
        cursor:pointer;
    }
`;
export const ContentLupa = styled.div`
    width: 80%;
    height: 2.5rem;
    border-bottom: 2px solid #BBB8D9;
    margin: 0 auto;
    input {
        border: none;
        width: 90%;
        height: 100%;
        margin-left: 5px;
        right: 0;
    }

    div {
        height: 100%;
        display: flex;
        align-items: flex-end;
        cursor: pointer;

        img {
            margin-right: 1.4rem;
        }

        p {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 1rem;
            color: #302E45;
        }
    }
`

export const ContentStatus = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: fit-content;
        padding: 5px 15px;
        border: 1px solid #BBB8D9;
        border-radius: 25px;

        font-family: Inter, sans-serif;
        font-weight: 400;
        font-size: 0.8rem;
        color: #302E45;

        & + div {
            margin-left: 15px;
        }
    }
 
`

export const ContainertLupa = styled.div`
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TextLoading = styled.span`
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
`