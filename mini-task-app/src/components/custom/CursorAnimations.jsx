"use client"

import { motion } from "motion/react"
import { useRef } from "react"
import { useFollowPointer } from '@/hooks/useCursor'

export default function Cursor() {
    const ref = useRef(null)
    const { x, y } = useFollowPointer(ref)

    return <motion.div ref={ref} style={{ ...ball, x, y }} />
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: 20,
    height: 20,
    backgroundColor: "#00bc7d",
    borderRadius: "50%",
    opacity: 0.5
}
