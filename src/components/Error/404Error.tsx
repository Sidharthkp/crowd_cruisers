import { useNavigate } from "react-router-dom"
import "../../styles/error.scss"

const Errorfour = () => {
    const navigate = useNavigate()

    const homeButton = (e: any) => {
        e.preventDefault()
        navigate('/')
    }
    return (
        <div className="box z-50">
            <div className="box__ghost">
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>

                <div className="box__ghost-container">
                    <div className="box__ghost-eyes">
                        <div className="box__eye-left"></div>
                        <div className="box__eye-right"></div>
                    </div>
                    <div className="box__ghost-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="box__ghost-shadow"></div>
            </div>

            <div className="box__description">
                <div className="box__description-container">
                    <div className="box__description-title">Whoops!</div>
                    <div className="box__description-text">It seems like we couldn't find the page you were looking for</div>
                </div>

                <a  target="_blank" onClick={homeButton} className="cursor-pointer box__button">Go back</a>

            </div>

        </div>
    )
}

export default Errorfour