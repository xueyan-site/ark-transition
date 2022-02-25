import React, { useState } from 'react'
import { FadeTransition, SlideTransition, SwitchTransition, MoveTransition } from 'xueyan-react-transition'

export default function Main() {
  return (
    <div>
      {/* <List/> */}
      <Move />
      <Switch />
      <Slide />
      <Fade/>
    </div>
  )
}

// function List() {
//   const [visible, setVisible] = useState<boolean>(true)
//   const [move, setMove] = useState<boolean>(false)
//   return (
//     <div>
//       <div onClick={() => setVisible(!visible)}>改变</div>
//       <div onClick={() => setMove(!move)}>移动</div>
//       {!move && (
//         <span
//           style={{
//             width: '100px',
//             height: '20px',
//             backgroundColor: '#cc8',
//             display: 'inline-block',
//           }}
//         />
//       )}
//       <ListTransition>
//         {(visible ? [1,3,6,2,5,7] : [1,6,3,5,2,7]).map(i => (
//           <div key={i}>{i}</div>
//         ))}
//       </ListTransition>
//     </div>
//   )
// }

function Move() {
  const [visible, setVisible] = useState<boolean>(true)
  const [move, setMove] = useState<boolean>(false)
  return (
    <div>
      <div onClick={() => setVisible(!visible)}>改变</div>
      <div onClick={() => setMove(!move)}>移动</div>
      {!move && (
        <span
          style={{
            width: '100px',
            height: '20px',
            backgroundColor: '#cc8',
            display: 'inline-block',
          }}
        />
      )}
      <MoveTransition
        appear
        enterActiveStyle={{
          transition: 'all 0.3s ease-in'
        }}
        leaveActiveStyle={{
          transition: 'all 0.3s ease-out'
        }}
        enterFromStyle={{
          opacity: 0,
          transform: 'translateX(-100px)'
        }}
        leaveToStyle={{
          opacity: 0,
          transform: 'translateX(100px)'
        }}
        enterEndedStyle={{
          transition: 'all 1s'
        }}
      >
        {visible && (
          <span
            key="4"
            style={{
              width: move ? 100 : 60,
              height: move ? 60 : 100,
              opacity: move ? 1 : 0.2,
              backgroundColor: move ? 'red' : 'blue',
              display: 'inline-block',
            }}
          ></span>
        )}
      </MoveTransition>
    </div>
  )
}

function Switch() {
  const [visible, setVisible] = useState<boolean>(true)
  const [value, setValue] = useState<boolean>(true)
  return (
    <div>
      <div onClick={() => setVisible(!visible)}>显隐</div>
      <div onClick={() => setValue(!value)}>改变</div>
      <SwitchTransition
        mode="out-in"
        enterActiveStyle={{
          transition: 'all 0.3s ease-in'
        }}
        leaveActiveStyle={{
          transition: 'all 0.3s ease-out'
        }}
        enterFromStyle={{
          opacity: 0,
          transform: 'translateX(-100px)'
        }}
        leaveToStyle={{
          opacity: 0,
          transform: 'translateX(100px)'
        }}
      >
        {!visible ? null : value ? (
          <div key="blue" style={{ width: 100, backgroundColor: '#38f', height: 40 }}></div>
        ) : (
          <div key="yellow" style={{ width: 100, backgroundColor: '#f83', height: 40 }}></div>
        )}
      </SwitchTransition>
    </div>
  )
}

function Fade() {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div>
      <div onClick={() => setVisible(!visible)}>改变</div>
      <FadeTransition
        value={visible}
        enterTimingFunction="ease-in"
        leaveTimingFunction="ease-out"
      >
        <div style={{ width: 100, backgroundColor: '#38f', height: 40, overflow: 'auto' }}>
          <div>jjjj</div>
          <div>jjjj</div>
          <div>头疼头疼头疼</div>
          <div>jjjj</div>
          <div>我的分割线</div>
          <div>jjjj</div>
          <div>00</div>
          <div>=============</div>
          <div>jjjj</div>
          <div>jjjj</div>
        </div>
      </FadeTransition>
    </div>
  )
}

function Slide() {
  const [visible, setVisible] = useState<boolean>(true)
  return (
    <div>
      <div onClick={() => setVisible(!visible)}>改变</div>
      <SlideTransition 
        value={visible}
        opacity={1}
        enterDuration="1s"
        leaveDuration="2s"
        enterTimingFunction="ease-in"
        leaveTimingFunction="ease-out"
      >
        <div style={{ width: 100, backgroundColor: '#f83', height: 40 }}></div>
      </SlideTransition>
    </div>
  )
}
