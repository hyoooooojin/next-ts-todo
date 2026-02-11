"use client";

import React from 'react'
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <img src="/logo.png" alt="logo" className={styles.logo} />
        <img src="/mobileLogo.png" alt="mobileLogo" className={styles.mobileLogo} />
      </Link>
    </header>
  )
}
