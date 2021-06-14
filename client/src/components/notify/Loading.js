




function Loading() {


  return (<>
    <div className='loadSpinner w-100 h-100 position-fixed'>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

    </div>
  </>
  )
}
export default Loading;





/* css loader
 <div className='loadSpinner w-100 h-100 position-fixed'>
 <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
 */

/* <svg className='svg' style={{margin: "auto", background: "none",display: 'block', shapeRendering: 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="3" ry="4.44" width="6" height="12" fill="#0055a5">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g>
</svg>*/



/* ----- blakck spinner
<svg style={{margin: 'auto', background: 'none', shapeRendering: 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="translate(80,50)">
<g transform="rotate(0)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="1">
  <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
</circle>
</g>
</g><g transform="translate(71.21320343559643,71.21320343559643)">
<g transform="rotate(45)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.875">
  <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
</circle>
</g>
</g><g transform="translate(50,80)">
<g transform="rotate(90)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.75">
  <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
</circle>
</g>
</g><g transform="translate(28.786796564403577,71.21320343559643)">
<g transform="rotate(135)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.625">
  <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
</circle>
</g>
</g><g transform="translate(20,50.00000000000001)">
<g transform="rotate(180)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.5">
  <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
</circle>
</g>
</g><g transform="translate(28.78679656440357,28.786796564403577)">
<g transform="rotate(225)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.375">
  <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
</circle>
</g>
</g><g transform="translate(49.99999999999999,20)">
<g transform="rotate(270)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.25">
  <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
</circle>
</g>
</g><g transform="translate(71.21320343559643,28.78679656440357)">
<g transform="rotate(315)">
<circle cx="0" cy="0" r="6" fill="#363434" fill-opacity="0.125">
  <animateTransform attributeName="transform" type="scale" begin="0s" values="0.88 0.88;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
</circle>
</g>
</g>
</svg>
*/


