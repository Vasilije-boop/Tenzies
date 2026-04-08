export default function Die(props){

    const styles={
        backgroundColor: props.isHeld? "#59E391":"white"
    } 

    return(
        <>
            <button onClick={() => props.hold(props.id)} id="die-div" style={styles}>
                <h1>{props.value}</h1>
            </button>
        </>
    )
}