// fix - add field block "blockchain"
interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

// dont need this interface in this situation

//   interface FormattedWalletBalance {
//     currency: string;
//     amount: number;
//     formatted: string;
//   }

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    // issues:
    // get balancePriority but don't using
    // filter to  get amount > 0 to reduce numbers of times "getPriority" is called, but it is incorrect
    // getPriority is used multiple time when sorting but it memorized as useMemo

    //   return balances.filter((balance: WalletBalance) => {
    //         const balancePriority = getPriority(balance.blockchain);
    //         if (lhsPriority > -99) {
    //            if (balance.amount <= 0) {
    //              return true;
    //            }
    //         }
    //         return false
    //       }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    //           const leftPriority = getPriority(lhs.blockchain);
    //         const rightPriority = getPriority(rhs.blockchain);
    //         if (leftPriority > rightPriority) {
    //           return -1;
    //         } else if (rightPriority > leftPriority) {
    //           return 1;
    //         }
    //   });

    // fixing

    return balances
      .filter((balance: WalletBalance) => balance.amount > 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  // don 't need in this case to reduce computing ,then improve performance
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        // formattedAmount={balance.formatted}
        // fixing code
        formattedAmount={balance.amount.toFixed()}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
