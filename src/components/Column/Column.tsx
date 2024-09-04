// // src/components/Column.tsx
// //Represents a single column in the board.
// import React, { useState, useEffect } from 'react';
// import Cell from '../Cell/Cell';
// import './Column.css';

// interface ColumnProps {
//   columnIndex: number;
//   onClick: (columnIndex: number) => void;
//   column: Array<string>;
// }

// const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
//   const [animateIndex, setAnimateIndex] = useState<number | null>(null);
//   const [falling, setFalling] = useState<boolean>(false);
//   const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);

//   //Faller genom spelpläsern.
//   // useEffect(() => {
//   //   if (animateIndex !== null && falling) {
//   //     const timeoutId = setTimeout(() => {
//   //       if (animateIndex > 0) {
//   //         setAnimateIndex(animateIndex - 1);  // Fortsätt fallet genom kolumnen
//   //       } else {
//   //         setFalling(false); // Stanna animeringen
//   //         // Nu kör vi onClick för att faktiskt utföra draget
//   //         onClick(columnIndex);  // Utför spelets logik när animationen är klar
//   //       }
//   //     }, 150);  // Animationens hastighet (i millisekunder)

//   //     return () => clearTimeout(timeoutId);
//   //   }
//   // }, [animateIndex, falling, onClick, columnIndex]);

//   useEffect(() => {
//     if (animateIndex !== null && falling) {
//       const timeoutId = setTimeout(() => {
//         // Fortsätt fallet genom de tomma cellerna
//         if (animateIndex < column.length - 1 && column[animateIndex + 1] === ' ') {
//           setAnimateIndex(animateIndex + 1);  // Flytta till nästa tomma cell
//         } else {
//           setFalling(false); // Stanna animeringen när vi nått den lediga platsen
//           onClick(columnIndex);  // Utför spelets logik när animationen är klar
//         }
//       }, 150);  // Animationens hastighet (i millisekunder)

//       return () => clearTimeout(timeoutId);
//     }
//   }, [animateIndex, falling, onClick, columnIndex]);

//   //Faller genom pjäsern.
//   // const handleClick = () => {
//   //   // Kontrollera vilken rad som är ledig (hitta den första lediga cellen i kolumnen)
//   //   const emptyRowIndex = column.findIndex(cell => cell === ' ');
    
//   //   if (emptyRowIndex !== -1) {
//   //     setFallingPlayer(column[emptyRowIndex] === ' ' ? 'X' : 'O'); // Välj vilken spelpjäs som ska falla
//   //     setAnimateIndex(emptyRowIndex);  // Börja fallet från den första lediga platsen
//   //     setFalling(true);  // Starta fall-animationen
//   //   } else {
//   //     // Om kolumnen är full, gör inget
//   //     console.log("Kolumnen är full");
//   //   }
//   // };
//   const handleClick = () => {
//     // Starta animeringen från toppen (index 0)
//     if (!falling) {
//       const firstEmptyIndex = column.findIndex(cell => cell === ' ');

//       if (firstEmptyIndex !== -1) {
//         setFallingPlayer(fallingPlayer === 'X' ? 'O' : 'X');  // Välj nästa spelpjäs att falla
//         setAnimateIndex(-1);  // Börja fallet från toppen
//         setFalling(true);  // Starta fall-animationen
//       }
//     }
//   };

//   return (
//     <div className="column" onClick={falling ? undefined : handleClick}>
//       {column.map((cell, rowIndex) => (
//         <Cell
//           key={rowIndex}
//           value={falling && rowIndex === animateIndex ? fallingPlayer : cell}
//           isAnimating={falling && rowIndex === animateIndex} // Hantera cellanimation
//         />
//       ))}
//     </div>
//   );
// };

// export default Column;

// //----------------------------
// import React, { useState, useEffect } from 'react';
// import Cell from '../Cell/Cell';
// import './Column.css';

// interface ColumnProps {
//   columnIndex: number;
//   onClick: (columnIndex: number) => void;
//   column: Array<string>;
// }

// const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
//   const [animateIndex, setAnimateIndex] = useState<number | null>(null);
//   const [falling, setFalling] = useState<boolean>(false);
//   const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);

//   useEffect(() => {
//     if (animateIndex !== null && falling) {
//       const timeoutId = setTimeout(() => {
//         // Fortsätt fallet genom de tomma cellerna
//         if (animateIndex < column.length - 1 && column[animateIndex + 1] === ' ') {
//           setAnimateIndex(animateIndex + 1);  // Flytta till nästa tomma cell
//         } else {
//           setFalling(false); // Stanna animeringen när vi nått den lediga platsen
//           onClick(columnIndex);  // Utför spelets logik när animationen är klar
//         }
//       }, 150);  // Animationens hastighet (i millisekunder)

//       return () => clearTimeout(timeoutId);
//     }
//   }, [animateIndex, falling, onClick, columnIndex]);

//   const handleClick = () => {
//     // Starta animeringen från toppen (index 0)
//     if (!falling) {
//       const firstEmptyIndex = column.findIndex(cell => cell === ' ');

//       if (firstEmptyIndex !== -1) {
//         setFallingPlayer(fallingPlayer === 'X' ? 'O' : 'X');  // Välj nästa spelpjäs att falla
//         setAnimateIndex(0);  // Börja fallet från toppen
//         setFalling(true);  // Starta fall-animationen
//       }
//     }
//   };

//   return (
//     <div className="column" onClick={falling ? undefined : handleClick}>
//       {column.map((cell, rowIndex) => (
//         <Cell
//           key={rowIndex}
//           value={falling && rowIndex === animateIndex ? fallingPlayer : cell}
//           isAnimating={falling && rowIndex === animateIndex} // Hantera cellanimation
//         />
//       ))}
//     </div>
//   );
// };

// export default Column;

//------------------------------
// import React, { useState, useEffect } from 'react';
// import Cell from '../Cell/Cell';
// import './Column.css';

// interface ColumnProps {
//   columnIndex: number;
//   onClick: (columnIndex: number) => void;
//   column: Array<string>;
// }

// const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
//   const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Index för att hålla koll på animationens nuvarande position
//   const [falling, setFalling] = useState<boolean>(false);  // Flagga för att markera om animationen pågår
//   const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Spelaren vars pjäs faller

//   useEffect(() => {
//     // Animationseffekten uppdateras när `animateIndex` ändras
//     if (animateIndex !== null && falling) {
//       const timeoutId = setTimeout(() => {
//         if (animateIndex < column.length - 1 && column[animateIndex + 1] === ' ') {
//           // Fortsätt att flytta animeringen nedåt om nästa cell är tom
//           setAnimateIndex(animateIndex + 1);
//         } else {
//           // När vi når den lediga platsen eller en blockerad cell, stoppa animeringen och kör spelets logik
//           setFalling(false);  // Stoppa animeringen
//           onClick(columnIndex);  // Utför spelets logik för att lägga till pjäsen när animeringen är klar
//         }
//       }, 150);  // Hastigheten på animationen (i millisekunder)

//       return () => clearTimeout(timeoutId);
//     }
//   }, [animateIndex, falling, onClick, columnIndex, column]);

//   const handleClick = () => {
//     // Kontrollera den första lediga platsen från botten (används för att stoppa animationen vid den platsen)
//     const emptyRowIndex = column.findIndex(cell => cell === ' ');
    
//     if (emptyRowIndex !== -1) {
//       setFallingPlayer(column[emptyRowIndex] === ' ' ? 'X' : 'O'); // Sätt rätt spelpjäs att falla
//       setAnimateIndex(0);  // Starta animeringen från toppen
//       setFalling(true);  // Starta fall-animationen
//     } else {
//       // Om kolumnen är full, gör inget
//       console.log("Kolumnen är full");
//     }
//   };

//   return (
//     <div className="column" onClick={falling ? undefined : handleClick}>
//       {column.map((cell, rowIndex) => (
//         <Cell
//           key={rowIndex}
//           value={falling && rowIndex === animateIndex ? fallingPlayer : cell}
//           isAnimating={falling && rowIndex === animateIndex}  // Hantera cellanimation
//         />
//       ))}
//     </div>
//   );
// };

// export default Column;

// import React, { useState, useEffect } from 'react';
// import Cell from '../Cell/Cell';
// import './Column.css';

// interface ColumnProps {
//   columnIndex: number;
//   onClick: (columnIndex: number) => void;
//   column: Array<string>;
// }

// const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
//   const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Index för animationens position
//   const [falling, setFalling] = useState<boolean>(false);  // Indikator om animationen pågår
//   const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Håller reda på spelarens pjäs som faller

//   useEffect(() => {
//     // Kör animationen om `animateIndex` är satt och om animationen pågår
//     if (animateIndex !== null && falling) {
//       const timeoutId = setTimeout(() => {
//         if (animateIndex < column.length - 1 && column[animateIndex + 1] === ' ') {
//           // Flytta animeringen neråt om nästa cell är tom
//           setAnimateIndex(animateIndex + 1);
//         } else {
//           // Stoppa animeringen när vi når den första lediga platsen
//           setFalling(false);
//           onClick(columnIndex);  // Lägger pjäsen på korrekt plats
//         }
//       }, 150);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [animateIndex, falling, onClick, columnIndex, column]);

//   const handleClick = () => {
//     // Börja animeringen från den översta cellen (index 0)
//     if (!falling) {
//       setFallingPlayer('X');  // Sätt den fallande pjäsen till spelaren som ska spela (just nu statiskt till 'X', ändra vid behov)
//       setAnimateIndex(-1);  // Starta från toppen (index 0)
//       setFalling(true);  // Starta animeringen
//     }
//   };

//   return (
//     <div className="column" onClick={falling ? undefined : handleClick}>
//       {column.map((cell, rowIndex) => (
//         <Cell
//           key={rowIndex}
//           value={falling && rowIndex === animateIndex ? fallingPlayer : cell}
//           isAnimating={falling && rowIndex === animateIndex}
//         />
//       ))}
//     </div>
//   );
// };

// export default Column;

import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import './Column.css';

interface ColumnProps {
  columnIndex: number;
  onClick: (columnIndex: number) => void;
  column: Array<string>;
}

const Column: React.FC<ColumnProps> = ({ columnIndex, onClick, column }) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);  // Index för animationens position
  const [falling, setFalling] = useState<boolean>(false);  // Indikator om animationen pågår
  const [fallingPlayer, setFallingPlayer] = useState<string | null>(null);  // Håller reda på spelarens pjäs som faller

  useEffect(() => {
    // Kör animationen om `animateIndex` är satt och om animationen pågår
    if (animateIndex !== null && falling) {
      const timeoutId = setTimeout(() => {
        if (animateIndex > 0 && column[animateIndex - 1] === ' ') {
          // Flytta animeringen uppåt om nästa cell är tom
          setAnimateIndex(animateIndex - 1);
        } else {
          // Stoppa animeringen när vi når den första lediga platsen
          setFalling(false);
          onClick(columnIndex);  // Lägger pjäsen på korrekt plats i spelet
        }
      }, 30);

      return () => clearTimeout(timeoutId);
    }
  }, [animateIndex, falling, onClick, columnIndex, column]);

  const handleClick = () => {
    if (!falling) {
      const firstEmptyCell = column.findIndex((cell) => cell === ' ');
      
      if (firstEmptyCell !== -1) {  // Om det finns en ledig cell i kolumnen
        setFallingPlayer('X');  // Sätt den fallande pjäsen till spelaren som ska spela (ändra till aktuell spelare)
        setAnimateIndex(column.length - 1);  // Börja från botten (index column.length - 1)
        setFalling(true);  // Starta animeringen
      }
    }
  };

  return (
    <div className="column" onClick={falling ? undefined : handleClick}>
      {column.map((cell, rowIndex) => (
        <Cell
          key={rowIndex}
          value={falling && rowIndex === animateIndex ? fallingPlayer! : cell}
          isAnimating={falling && rowIndex === animateIndex}
        />
      ))}
    </div>
  );
};

export default Column;
