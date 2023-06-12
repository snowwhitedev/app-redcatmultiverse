/* eslint-disable react/no-children-prop */
import React from 'react';
import parse from 'html-react-parser';
import styles from './GradientText.module.scss';

declare interface GradientTextProps {
  element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  text: string
  innerColor: string
  gradient: string[]
  fontSize?: string
}

const getGradientScale = (gradient: string[]): string => {
  const scale = gradient.map((color, index) => {
    return `${color} ${(index * 100) / gradient.length}%`
  }).join(', ')
  return `-webkit-linear-gradient(45deg, ${scale})`
}

const GradientText = (props: GradientTextProps) => {
  const { text, element, innerColor, gradient, fontSize = '' } = props
  const gradientElement = React.createElement(element, {
    children: parse(text),
    className: styles.gradient_text,
    style: {
      color: innerColor,
      backgroundColor: gradient[0],
      background: getGradientScale(gradient),
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-moz-background-clip': 'text',
      wordBreak: 'breakWord',
      fontSize: fontSize,
    }
  })

  return (
    <div className={styles.gradient_container}>
      {gradientElement}
    </div>
  )
}

export default GradientText