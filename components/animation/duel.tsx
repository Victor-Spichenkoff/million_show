'use client'

import { motion } from "framer-motion"
import Image from "next/image"

export function DuelAvatars() {
    return (
        <div className="flex gap-4 justify-center">
            <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                <Image src="/avatar1.png" alt="Player 1" width={64} height={64} />
            </motion.div>

            <motion.div
                animate={{ x: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                <Image src="/avatar2.png" alt="Player 2" width={64} height={64} />
            </motion.div>
        </div>
    )
}
