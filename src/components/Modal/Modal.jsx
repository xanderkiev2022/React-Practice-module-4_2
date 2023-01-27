import React, { useEffect } from 'react';
import { Backdrop, ModalContent, Button } from './Modal.styled';

export const Modal = ({ currentImg: { src, alt }, close }) => {
  useEffect(() => {
    const closeByEscape = e => {
      if (e.code === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [close]);

  return (
    <Backdrop>
      <ModalContent>
        <img src={src} alt={alt} />
        <Button type="button" onClick={close}>
          Close
        </Button>
      </ModalContent>
    </Backdrop>
  );
};

//
// export class Modal extends Component {

// componentDidMount(){
//     window.addEventListener('keydown', this.closeByEscape);
// }

// closeByEscape=(e)=>{
// if(e.code ==='Escape'){
//     this.props.close()
// }
// }

// componentWillUnmount(){
//     window.removeEventListener('keydown', this.closeByEscape);
// }

//   render() {
//     const {
//       currentImg: { src, alt },
//     } = this.props;
//     return (
//       <Backdrop>
//         <ModalContent>
//           <img src={src} alt={alt} />
//           <Button type="button" onClick={this.props.close}>
//             Close
//           </Button>
//         </ModalContent>
//       </Backdrop>
//     );
//   }
// }
