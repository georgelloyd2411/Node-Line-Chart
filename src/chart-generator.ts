/**
 * @author Lloyd
 * @date 2025/09/07
 * @description Chart generation utility for visualizing profit analysis data using Chart.js
 */

import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Represents a single data point for profit analysis visualization.
 * Contains input amount and corresponding profit values for charting.
 */
interface DataPoint {
  /** The input amount in USD for the analysis */
  inputAmount: number;
  
  /** The resulting profit in USD from the input amount */
  profit: number;
}

/**
 * Chart generation service for creating professional profit analysis visualizations.
 * Utilizes Chart.js with Node.js canvas backend for server-side chart rendering.
 */
class ChartGenerator {
  /** Chart.js canvas instance for rendering charts to image buffers */
  private chartJSNodeCanvas: ChartJSNodeCanvas;

  /**
   * Initializes the chart generator with specified canvas dimensions.
   * @param {number} width - Canvas width in pixels (default: 800)
   * @param {number} height - Canvas height in pixels (default: 600)
   */
  constructor(width: number = 800, height: number = 600) {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({ 
      width, 
      height,
      backgroundColour: 'white',
    });
  }

  /**
   * Generates a professional line chart showing profit vs input amount relationship.
   * Creates a PNG image file with formatted data visualization and statistical analysis.
   * @param {DataPoint[]} data - Array of data points to plot on the chart
   * @param {string} filename - Output filename for the generated chart (default: 'line-chart.png')
   */
  async generateLineChart(data: DataPoint[], filename: string = 'line-chart.png'): Promise<void> {
    // Sort data by input amount for optimal line chart visualization and trend analysis
    const sortedData = data.sort((a, b) => a.inputAmount - b.inputAmount);

    // Configure Chart.js with professional styling and layout options
    const configuration: ChartConfiguration = {
      type: 'line',
      data: {
        labels: sortedData.map(point => point.inputAmount.toString()),
        datasets: [{
          label: 'Profit vs Input Amount',
          data: sortedData.map(point => ({
            x: point.inputAmount,
            y: point.profit
          })),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 3,
          fill: false,
          tension: 0.1,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Profit Analysis Chart',
            font: {
              size: 18
            }
          },
          legend: {
            display: true,
            position: 'top',
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Input Amount ($)',
              font: {
                size: 14
              }
            },
            type: 'linear',
            position: 'bottom'
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Profit ($)',
              font: {
                size: 14
              }
            }
          }
        },
        elements: {
          point: {
            radius: 5,
            hoverRadius: 8
          }
        }
      }
    };

    try {
      // Render chart configuration to image buffer
      const imageBuffer = await this.chartJSNodeCanvas.renderToBuffer(configuration);
      const outputPath = path.join(process.cwd(), filename);
      
      // Write image buffer to file system
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`✅ Chart saved successfully as: ${outputPath}`);
      
      // Display comprehensive data analysis summary
      this.displayDataSummary(sortedData);
      
    } catch (error) {
      console.error('❌ Error generating chart:', error);
      throw error;
    }
  }

  /**
   * Displays a formatted console summary of the data points and statistical analysis.
   * Provides tabular data view and key performance metrics for quick analysis.
   * @param {DataPoint[]} data - Sorted array of data points to analyze and display
   */
  private displayDataSummary(data: DataPoint[]): void {
    // Display formatted data table with professional styling
    console.log('\n📊 Data Summary:');
    console.log('┌─────────────────┬─────────────────┐');
    console.log('│   Input Amount  │     Profit      │');
    console.log('├─────────────────┼─────────────────┤');
    
    // Iterate through data points and format for table display
    data.forEach(point => {
      const input = point.inputAmount.toFixed(2).padStart(13);
      const profit = point.profit.toFixed(2).padStart(13);
      console.log(`│ $${input} │ $${profit} │`);
    });
    
    console.log('└─────────────────┴─────────────────┘');

    // Calculate and display key statistical metrics
    const maxProfit = Math.max(...data.map(d => d.profit));
    const minProfit = Math.min(...data.map(d => d.profit));
    const avgProfit = data.reduce((sum, d) => sum + d.profit, 0) / data.length;

    console.log(`\n📈 Statistics:`);
    console.log(`   Max Profit: $${maxProfit.toFixed(2)}`);
    console.log(`   Min Profit: $${minProfit.toFixed(2)}`);
    console.log(`   Avg Profit: $${avgProfit.toFixed(2)}`);
  }
}

/**
 * Demonstrates chart generation functionality with sample profit analysis data.
 * Creates a comprehensive visualization showing the relationship between input amounts and profits.
 */
async function main() {
  // Initialize chart generator with custom dimensions for high-quality output
  const chartGenerator = new ChartGenerator(1000, 700);

  // Sample data representing realistic profit analysis scenarios
  const sampleData: DataPoint[] = [
    { inputAmount: 1000, profit: 150 },
    { inputAmount: 2000, profit: 280 },
    { inputAmount: 3000, profit: 450 },
    { inputAmount: 4000, profit: 580 },
    { inputAmount: 5000, profit: 750 },
    { inputAmount: 6000, profit: 820 },
    { inputAmount: 7000, profit: 950 },
    { inputAmount: 8000, profit: 1100 },
    { inputAmount: 9000, profit: 1180 },
    { inputAmount: 10000, profit: 1350 },
  ];

  console.log('🚀 Generating line chart...\n');

  try {
    // Generate professional profit analysis chart with statistical summary
    await chartGenerator.generateLineChart(sampleData, 'profit-analysis-chart.png');
  } catch (error) {
    console.error('Failed to generate chart:', error);
    process.exit(1);
  }
}

// Execute the demonstration if this file is run directly
if (require.main === module) {
  main();
}

/**
 * Export chart generation utilities for use in other modules.
 * Provides access to both the main ChartGenerator class and DataPoint interface.
 */
export { ChartGenerator, DataPoint };