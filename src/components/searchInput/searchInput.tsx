import { IconButton, Input, InputAdornment } from "@material-ui/core"
import { ContainertLupa, ContentLupa } from "../../pages/styles"
import Image from "next/image"
import svgLupa from '../../../public/images/lupa.svg'
import { Dispatch, SetStateAction } from "react"

interface props {
    setSearch: Dispatch<SetStateAction<string>>
}

export const SearchInput = ({setSearch}:props) => {
    return (
        <ContainertLupa>
            <ContentLupa>
                <div>
                    <Input
                        fullWidth
                        id="standard-adornment-password"
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton type="submit" aria-label="search">
                                    <Image src={svgLupa} alt="Icone Lupa" />
                                    <span style={{ marginLeft: 10 }}>Buscar</span>
                                </IconButton>

                            </InputAdornment>
                        }
                    />
                </div>
            </ContentLupa>
        </ContainertLupa>
    )
}