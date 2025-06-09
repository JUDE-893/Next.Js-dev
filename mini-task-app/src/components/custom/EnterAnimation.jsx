import * as motion from "motion/react-client"

export default function EnterAnimation({children}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={ball}
        >{children}
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: '100%',
    borderRadius: "0%",
}
