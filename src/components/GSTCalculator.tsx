import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GSTCalculator = () => {
  const [amount, setAmount] = useState<string>("");
  const [results, setResults] = useState({
    amountWithoutGST: 0,
    weightInKG: 0,
    kgMultiplied: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    finalGST: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const gstRate = 0.05; // 5% total GST
    const cgstRate = 0.025; // 2.5% CGST
    const sgstRate = 0.025; // 2.5% SGST
    const divisionValue = 320;

    const amountReceived = parseFloat(amount);

    if (!isNaN(amountReceived) && amountReceived > 0) {
      setIsAnimating(true);
      
      const amountWithoutGST = amountReceived / (1 + gstRate);
      const weightInKG = amountWithoutGST / divisionValue;
      const kgMultiplied = weightInKG * divisionValue;
      const cgstAmount = kgMultiplied * cgstRate;
      const sgstAmount = kgMultiplied * sgstRate;
      const finalGST = kgMultiplied + cgstAmount + sgstAmount;

      setTimeout(() => {
        setResults({
          amountWithoutGST,
          weightInKG,
          kgMultiplied,
          cgstAmount,
          sgstAmount,
          finalGST,
        });
        setIsAnimating(false);
      }, 150);
    } else {
      setResults({
        amountWithoutGST: 0,
        weightInKG: 0,
        kgMultiplied: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        finalGST: 0,
      });
    }
  }, [amount]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          M.A.A.R Metals GST Calculator
        </h1>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md p-6 md:p-8 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-lg">
                Amount Received:
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg h-12 transition-all focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center text-base">
                <span className="text-foreground">Subtract GST (5%):</span>
                <span 
                  className={`font-bold text-primary min-w-[100px] text-right transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  ₹{results.amountWithoutGST.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-base bg-accent p-3 rounded-lg">
                <span className="text-accent-foreground font-medium">
                  Divide by 320:
                </span>
                <span 
                  className={`font-bold text-primary min-w-[100px] text-right transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {results.weightInKG.toFixed(2)} KG
                </span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-foreground">KG value × 320:</span>
                <span 
                  className={`font-bold text-primary min-w-[100px] text-right transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  ₹{results.kgMultiplied.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-foreground">CGST (2.5%):</span>
                <span 
                  className={`font-bold text-primary min-w-[100px] text-right transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  ₹{results.cgstAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-foreground">SGST (2.5%):</span>
                <span 
                  className={`font-bold text-primary min-w-[100px] text-right transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  ₹{results.sgstAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-base pt-2 border-t">
                <span className="text-foreground font-semibold">
                  Total (incl. 2.5% CGST + 2.5% SGST):
                </span>
                <span 
                  className={`font-bold text-primary text-lg min-w-[100px] text-right transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  ₹{results.finalGST.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GSTCalculator;
