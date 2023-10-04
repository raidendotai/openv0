module.exports = {
  stripe_products: {
    object: "products.list",
    data: [
      {
        id: "prod_NwdPnpqn",
        object: "product",
        active: false,
        attributes: [],
        created: 1684805725,
        default_price: "price_eX793JVIHcao",
        description: "Additional credits to be used for Instaphrase services.",
        features: [],
        images: [
          "https://files.stripe.com/links/MDB8YWNjdF8xTWpwejJMU1B2Rjh6Z0VRfGZsX3Rlc3RfMGFFODNTUTJINkFlWnR1SUdSbmpNRVRs00Ew88hTz4",
        ],
        livemode: false,
        metadata: {},
        name: "Instaphrase Additional Credits",
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: "txcd_10103000",
        type: "service",
        unit_label: null,
        updated: 1684805860,
        url: null,
      },
      {
        id: "prod_NwcWsdeC",
        object: "product",
        active: true,
        attributes: [],
        created: 1684802433,
        default_price: "price_eX798KGtIwuw",
        description:
          "Monthly membership subscription to access Instaphrase services.",
        features: [],
        images: [
          "https://files.stripe.com/links/MDB8YWNjdF8xTWpwejJMU1B2Rjh6Z0VRfGZsX3Rlc3RfaFlXeHYwZmJVSTRCdmdWWFNLOXZDWHpn00KNMny4ya",
        ],
        livemode: false,
        metadata: {},
        name: "Instaphrase Monthly Subscription",
        package_dimensions: null,
        shippable: null,
        statement_descriptor: null,
        tax_code: "txcd_10103000",
        type: "service",
        unit_label: null,
        updated: 1684953850,
        url: null,
      },
    ],
  },

  soccer_game: {
    match_info: {
      home_team: "Manchester City",
      away_team: "Queens Park Rangers",
      date: "2012-05-13",
      venue: "Etihad Stadium",
      final_score: "3-2",
    },
    events: [
      {
        event_type: "goal",
        player: "Pablo Zabaleta",
        team: "Manchester City",
        minute: 39,
        description: "Pablo Zabaleta scores for Manchester City.",
      },
      {
        event_type: "goal",
        player: "Djibril Cissé",
        team: "Queens Park Rangers",
        minute: 48,
        description: "Djibril Cissé scores for Queens Park Rangers.",
      },
      {
        event_type: "yellow_card",
        player: "Joey Barton",
        team: "Queens Park Rangers",
        minute: 54,
        description:
          "Joey Barton receives a yellow card for Queens Park Rangers.",
      },
      {
        event_type: "goal",
        player: "Jamie Mackie",
        team: "Queens Park Rangers",
        minute: 66,
        description: "Jamie Mackie scores for Queens Park Rangers.",
      },
      {
        event_type: "substitution",
        player_in: "Edin Džeko",
        player_out: "Nigel de Jong",
        team: "Manchester City",
        minute: 69,
        description:
          "Substitution: Edin Džeko replaces Nigel de Jong for Manchester City.",
      },
      {
        event_type: "goal",
        player: "Sergio Agüero",
        team: "Manchester City",
        minute: 93,
        description:
          "Sergio Agüero scores the winning goal for Manchester City.",
      },
      {
        event_type: "substitution",
        player_in: "Shaun Wright-Phillips",
        player_out: "Alejandro Faurlín",
        team: "Queens Park Rangers",
        minute: 77,
        description:
          "Substitution: Shaun Wright-Phillips replaces Alejandro Faurlín for Queens Park Rangers.",
      },
      {
        event_type: "red_card",
        player: "Joey Barton",
        team: "Queens Park Rangers",
        minute: 54,
        description: "Joey Barton receives a red card for Queens Park Rangers.",
      },
    ],
    match_description:
      "On 13 May 2012, Manchester City played Queens Park Rangers at the Etihad Stadium in both teams' final match of the 2011–12 Premier League season. City entered the match in first place on goal difference, being level on points with local rivals Manchester United, and needed to match United's result to win the league. Meanwhile, QPR entered the match one spot above the relegation zone, knowing that a draw would secure safety at the expense of Bolton Wanderers. City won the match in dramatic fashion, reversing a 2–1 deficit by scoring two goals in stoppage time, with the winner being scored by Sergio Agüero, to clinch their first league title since the 1967–68 season. The win began a period of dominance in English football for City, with the club winning five more Premier League titles over the subsequent 10 years.",
    match_highlights: [
      "The match, and more specifically, the final goal of the match, has repeatedly been described as one of the greatest moments in Premier League history.",
      "The terms '93:20' describe the exact second of the match at which point the final goal was scored.",
      "'Agueroooooo' was commentator Martin Tyler's live response to the goal and has entered Manchester City folklore.",
    ],
  },
};
