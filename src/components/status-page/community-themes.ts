// type CommunityTheme = {
//   light: Record<string, string>;
//   dark: Record<string, string>;
// };

export const supabaseTheme = {};

export const githubTheme = {
  dark: {
    "--background": "oklch(10.39% 0.0194 248.34)",
    "--foreground": "oklch(100% 0 0)",
    "--border": "oklch(58.41% 0.011 252.87)",
    "--input": "oklch(58.41% 0.011 252.87)",

    "--muted": "oklch(33.39% 0.0223 256.4)",
    "--muted-foreground": "oklch(79.7% 0.0169 262.74)",
    "--secondary": "oklch(33.39% 0.0223 256.4)",
    "--secondary-foreground": "oklch(100% 0 0)",
    "--accent": "oklch(33.39% 0.0223 256.4)",
    "--accent-foreground": "oklch(100% 0 0)",

    "--success": "oklch(54.34% 0.1634 145.98)",
    "--destructive": "oklch(47.1% 0.1909 25.95)",
    "--warning": "oklch(40.97% 0.2064 289.57)",
    "--info": "oklch(46.96% 0.2957 264.51)",
  } as React.CSSProperties,
};
