'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function Home() {
  return (
    <>
      <div className="relative flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            animate="show"
            className="max-w-3xl px-5 xl:px-0"
            initial="hidden"
            viewport={{ once: true }}
            whileInView="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <motion.h1
              className="text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Web3 Sets Identity</Balancer>
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </>
  )
}
