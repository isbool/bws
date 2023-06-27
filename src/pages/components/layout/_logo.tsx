import React from "react";
import Image from 'next/image';
import logo from '../../../../public/Bwater_logo_RGB_100px_transparent.webp'

export function Logo() {
 
  return (
    <Image
        priority
        src={logo}
        alt="logo"
        width={100}
        style={{
          WebkitUserDrag: 'none',
          userSelect: 'none',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
        }}
      />
  );
}
