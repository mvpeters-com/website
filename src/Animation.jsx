import Spline from '@splinetool/react-spline';

export default function Animation() {
  return (
      <Spline style={{
        width: '90%',
        height: '90%',
        position: 'absolute',
        top: '5%',
        left: '5%',
      }} scene="https://prod.spline.design/1h5V2AEnzh10dGAd/scene.splinecode"/>
  );
}
